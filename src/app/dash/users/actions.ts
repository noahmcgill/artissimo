"use server";

import { api } from "@/trpc/server";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export async function invite(formData: FormData): Promise<{
    batchId: string | null;
    error: string | null;
    displayErr?: boolean;
}> {
    const data = {
        emails: formData.get("emails") as string,
        role: formData.get("role") as UserRole,
        courseId: formData.get("courseId") as string | undefined,
    };

    const emails = data.emails.split(/\n/);
    if (new Set(emails).size !== emails.length) {
        return {
            batchId: null,
            error: "One or more of the email addresses provided is a duplicate. Please remove duplicates to proceed.",
            displayErr: true,
        };
    }

    try {
        const emailsSchema = z.array(z.string().email());
        emailsSchema.parse(emails);
    } catch (error) {
        console.error(error);
        return {
            batchId: null,
            error: "One or more of the email addresses provided is invalid.",
            displayErr: true,
        };
    }

    try {
        const roleSchema = z.nativeEnum(UserRole);
        roleSchema.parse(data.role);
    } catch (error) {
        console.error(error);
        return { batchId: null, error: "Please provide a valid role." };
    }

    try {
        const courseIdSchema = z.string().uuid().optional();
        courseIdSchema.parse(data.courseId);
    } catch (error) {
        console.error(error);
        return { batchId: null, error: "Please provide a valid courseId." };
    }

    try {
        const { batchId } = await api.user.createBatchInvitationRequest({
            emails,
            role: data.role,
            courseId: data.courseId,
        });

        return {
            batchId,
            error: null,
        };
    } catch (e) {
        console.log(e);
        return {
            batchId: null,
            error: "An unexpected error occurred. Please try again.",
            displayErr: true,
        };
    }
}
