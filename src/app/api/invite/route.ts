import { json } from "@/lib/utils/api/route";
import { createClient } from "@/lib/utils/supabase/server";
import { createClient as baseCreateClient } from "@supabase/supabase-js";
import { db } from "@/server/db";
import {
    BatchInvitationCreationStatus,
    type Prisma,
    UserRole,
} from "@prisma/client";
import { type NextRequest } from "next/server";
import { z } from "zod";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { api } from "@/trpc/server";

export interface InviteRequestBody {
    emails: string[];
    role: UserRole;
    batchId: string;
    invitedById: string;
    courseId?: string;
}

export const POST = verifySignatureAppRouter(async (request: NextRequest) => {
    const supabase = await createClient();

    const jwt = request.headers.get("Authorization")?.split(" ")[1];
    const { data: user, error } = await supabase.auth.getUser(jwt);

    if (error || !user) {
        console.error("Unauthorized request to invite endpoint blocked");
        return json(
            {
                code: "bad_jwt",
            },
            401,
        );
    }

    const metadata = await api.user.getByEmail({
        email: user.user.email ?? "",
        jwt,
    });
    if (metadata.role !== UserRole.ADMIN) {
        console.error(
            "A request to invite users from a non-admin user was blocked",
        );
        return json(
            {
                code: "forbidden",
            },
            403,
        );
    }

    const schema = z.object({
        emails: z.array(z.string()),
        role: z.nativeEnum(UserRole),
        courseId: z.string().uuid(),
        batchId: z.string().uuid(),
        invitedById: z.string().uuid(),
    });
    const body = (await request.json()) as InviteRequestBody;

    try {
        schema.parse(body);
    } catch (e) {
        console.error(e);
        return json(
            {
                code: "invalid_request_body",
            },
            400,
        );
    }

    const invitations: Prisma.InvitationCreateManyInput[] = [];
    const errors: Record<string, unknown> = {};

    // We need to create an instance of the admin client to invite users
    const supabaseAdmin = baseCreateClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        },
    );

    for (const email of body.emails) {
        const { data, error } =
            await supabaseAdmin.auth.admin.inviteUserByEmail(email);

        if (error) {
            errors[email] = error;
            continue;
        }

        // @todo: edge case where user has already been invited to the course

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
        // @todo: move these to service
        await db.$transaction([
            db.invitation.createMany({
                data: invitations,
            }),
            db.batchInvitationRequest.update({
                where: { id: body.batchId },
                data: {
                    status: BatchInvitationCreationStatus.COMPLETE,
                    errors: JSON.stringify(errors),
                },
            }),
        ]);

        // @todo: rollback user creation if tx fails?

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
});
