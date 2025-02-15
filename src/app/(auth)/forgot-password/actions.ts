"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

export async function sendResetPasswordEmail(
    formData: FormData,
): Promise<{ error: string | null }> {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
    };

    try {
        const emailSchema = z.string().email();
        emailSchema.parse(data.email);
    } catch (error) {
        console.error(error);
        return { error: "Please enter a valid email address." };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    if (error) {
        // @todo: more robust error handling
        console.error(error);
        return {
            error: "Something went wrong. It could be that the email address is not associated with an account.",
        };
    }

    return {
        error: null,
    };
}
