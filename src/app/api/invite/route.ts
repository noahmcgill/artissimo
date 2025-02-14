import { json } from "@/lib/utils/api/route";
import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/server/db";
import { type Prisma, UserRole } from "@prisma/client";
import { type NextRequest } from "next/server";
import { z } from "zod";

export interface InviteRequestBody {
    emails: string[];
    role: UserRole;
    batchId: string;
    invitedById: string;
    courseId?: string;
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const schema = z.object({
        emails: z.array(z.string()),
        role: z.nativeEnum(UserRole),
        courseId: z.string().uuid(),
        batchId: z.string().uuid(),
        invitedById: z.string().uuid(),
    });

    try {
        schema.parse(await request.json());
    } catch (e) {
        console.log(e);
        return json(
            {
                code: "invalid_request_body",
            },
            400,
        );
    }

    const body = (await request.json()) as InviteRequestBody;

    const invitations: Prisma.InvitationCreateManyInput[] = [];
    const errors: Record<string, unknown> = {};

    for (const email of body.emails) {
        const { data, error } =
            await supabase.auth.admin.inviteUserByEmail(email);

        if (error) {
            errors[email] = error.code;
            continue;
        }

        // @todo: edge case where user has already been invited to the course
        // @todo: roll back user creation if transaction fails?

        invitations.push({
            id: data.user.id,
            email,
            role: body.role,
            courseId: body.courseId,
            invitedById: body.invitedById,
        });
    }

    // Add users to db
    try {
        await db.invitation.createMany({
            data: invitations,
        });
        return json({ status: "ok" }, 200);
    } catch (e) {
        console.error(e);
        return json(
            {
                code: "unexpected_error",
            },
            500,
        );
    }
}
