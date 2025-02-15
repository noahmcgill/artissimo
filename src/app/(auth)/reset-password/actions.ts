"use server";

import { auth } from "@/lib/utils/supabase/server";
import { z } from "zod";

export async function resetPassword(
    newPassword: string,
): Promise<{ error: string | null }> {
    try {
        const passwordSchema = z.string().min(8);
        passwordSchema.parse(newPassword);
    } catch (error) {
        console.error(error);
        return { error: "Please enter a valid email address." };
    }

    const { error } = await auth.updateUser({ password: newPassword });

    if (error) {
        // @todo: more robust error handling
        console.error(error);
        return {
            error: "Something went wrong. Please try again.",
        };
    }

    return {
        error: null,
    };
}
