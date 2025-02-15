import { baseUrl } from "@/lib/constants";
import { dedupArray } from "@/lib/utils/array";
import { Client } from "@upstash/qstash";
import { db } from "@/server/db";
import {
    type BatchInvitationCreationStatus,
    type User,
    type UserRole,
} from "@prisma/client";
import { auth } from "@/lib/utils/supabase/server";
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

    async getByEmail(email: string): Promise<User | null> {
        return await db.user.findUnique({
            where: { email },
        });
    }

    async createBatchInvitationRequest(
        emails: string[],
        role: UserRole,
        courseId?: string,
    ) {
        const qstash = new Client();

        // remove duplicate emails
        const emailsLower = emails.map((email) => email.toLowerCase());
        const finalEmails = dedupArray(emailsLower);

        // create batch invitation creation request
        const dbRes = await db.batchInvitationRequest.create({
            data: {},
        });

        const invitedBy = await auth.getUser();
        const body: InviteRequestBody = {
            emails: finalEmails,
            role,
            batchId: dbRes.id,
            invitedById: invitedBy.data.user?.id ?? "",
            courseId,
        };

        // send off this request for async processing
        const session = await auth.getSession();
        await qstash.publishJSON({
            url: `${baseUrl}/api/invite`,
            body,
            headers: {
                Authorization: `Bearer ${session.data.session?.access_token}`,
            },
        });

        return {
            batchId: dbRes.id,
        };
    }

    async getBatchInvitationRequestStatus(
        id: string,
    ): Promise<GetBatchInvitationRequestStatusRes | null> {
        const batch = await db.batchInvitationRequest.findUnique({
            where: { id },
        });

        if (!batch) {
            return null;
        }

        return {
            id: batch.id,
            status: batch.status,
            errors: batch.errors,
        };
    }
}
