import { baseUrl, TRPCErrorCode } from "@/lib/constants";
import { dedupArray } from "@/lib/utils/array";
import { Client } from "@upstash/qstash";
import { db } from "@/server/db";
import {
    type BatchInvitationCreationStatus,
    type User,
    type UserRole,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createClient } from "@/lib/utils/supabase/server";
import { type InviteRequestBody } from "@/app/api/invite/route";
import { type JsonValue } from "@prisma/client/runtime/library";

interface GetBatchInvitationRequestStatusRes {
    id: string;
    status: BatchInvitationCreationStatus;
    errors: JsonValue;
}

export class UserService {
    static instance: UserService | null = null;

    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }

    async getByEmail(email: string): Promise<User> {
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

    async createBatchInvitationRequest(
        emails: string[],
        courseId: string,
        role: UserRole,
    ) {
        const qstash = new Client({ token: process.env.QSTASH_TOKEN! });
        const supabase = await createClient();

        // remove duplicate emails
        const emailsLower = emails.map((email) => email.toLowerCase());
        const finalEmails = dedupArray(emailsLower);

        // create batch invitation creation request
        const dbRes = await db.batchInvitationRequest.create({});

        // send off this request for async processing
        const invitedBy = await supabase.auth.getUser();
        const body: InviteRequestBody = {
            emails: finalEmails,
            role,
            courseId,
            batchId: dbRes.id,
            invitedById: invitedBy.data.user?.id ?? "",
        };
        await qstash.publishJSON({
            url: `${baseUrl}/invite`,
            body,
        });

        return {
            batchId: dbRes.id,
        };
    }

    async getBatchInvitationRequestStatus(
        id: string,
    ): Promise<GetBatchInvitationRequestStatusRes> {
        const batch = await db.batchInvitationRequest.findUnique({
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
            status: batch.status,
            errors: batch.errors,
        };
    }
}
