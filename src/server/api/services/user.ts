import { TRPCErrorCode } from "@/lib/constants";
import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/server/db";
import { type Prisma, type UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class UserService {
    static instance: UserService | null = null;

    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }

    async getByEmail(email: string) {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new TRPCError({
                // If no user is found, something has gone wrong on our end
                code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
                message: "The requested user was not found",
            });
        }

        return user;
    }

    async inviteUsers(
        initialEmails: string[],
        courseId: string,
        role: UserRole,
    ) {
        // remaining unaccounted-for edge cases:
        // - supabase calls succeed but db transaction fails
        // - user has already been invited to a course

        // @todo - think about making async and how that would work
        // @todo - think about retry between supabase and db transaction

        const supabase = await createClient();
        const errors: Record<string, unknown> = {};

        // remove duplicates
        const emailsLower = initialEmails.map((email) => email.toLowerCase());
        const filteredEmails = new Set(emailsLower);
        const emails = [...filteredEmails];

        const invitations: Prisma.InvitationCreateManyInput[] = [];

        // Create users in supabase and prepare db transaction
        for (const email of emails) {
            const { data, error } =
                await supabase.auth.admin.inviteUserByEmail(email);

            if (error) {
                errors[email] = error.code;
                continue;
            }

            // @todo: edge case where user has already been invited to the course

            invitations.push({
                id: data.user.id,
                email,
                role,
                courseId,
            });
        }

        // Add users to db
        const res = await db.invitation.createMany({
            data: invitations,
        });

        return {
            data: {
                createdCount: res.count,
                emails: invitations.map((invitation) => invitation.email),
            },
            errors,
        };
    }
}
