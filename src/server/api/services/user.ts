import { baseUrl, TRPCErrorCode } from "@/lib/constants";
import { dedupArray } from "@/lib/utils/array";
import { Client } from "@upstash/qstash";
import { db } from "@/server/db";
import { type UserRole } from "@prisma/client";
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

    async beginInvitationProcessing(
        emails: string[],
        courseId: string,
        role: UserRole,
    ) {
        /**
         * Steps to process async (3 endpoints)
         * A. SEND (TRPC)
         *   1. Remove duplicate emails (verify duplicate emails in input on frontend and skip on backend)
         *   2. Create an BatchInvitationResponse in the database (includes state)
         *   3. Call QStash with the emails and the BatchInvitationResponse ID
         *   4. Return ID of BatchInvitationResponse to client
         * B. PROCESS (API ROUTE)
         *   1. Create users in Supabase
         *   2. Create users in Database
         *   3. If any errors, add them to the BatchInvitationResponse
         *   4. Update status of the BatchInvitationResponse
         * C. POLL (TRPC)
         *   1. Client polls this endpoint with the BatchInvitationResponse ID to check the status
         */

        const qstash = new Client({ token: process.env.QSTASH_TOKEN! });

        // remove duplicate emails
        const emailsLower = emails.map((email) => email.toLowerCase());
        const finalEmails = dedupArray(emailsLower);

        // create batch invitation creation record
        const dbRes = await db.batchInvitationCreation.create({});

        // send off this request for async processing
        await qstash.publishJSON({
            url: `${baseUrl}/invitations`,
            body: {
                emails: finalEmails,
                role,
                courseId,
                batchId: dbRes.id,
            },
        });

        return {
            batchId: dbRes.id,
        };
    }

    async getBatchInvitationStatus(id: string) {
        const batch = await db.batchInvitationCreation.findUnique({
            where: { id },
        });

        if (!batch) {
            throw new TRPCError({
                code: TRPCErrorCode.NOT_FOUND,
                message: "The requested batch was not found",
            });
        }

        return {
            id: batch.id,
            // @leftoff: need to return any errors, which means we need to save them in objects
            status: batch.status,
        };
    }
}
