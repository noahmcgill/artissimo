"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(
    formData: FormData,
): Promise<{ error: string | null }> {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    try {
        const emailSchema = z.string().email();
        emailSchema.parse(data.email);
    } catch (error) {
        console.error(error);
        return { error: "Please enter a valid email address." };
    }

    try {
        const passwordSchema = z.string().min(8);
        passwordSchema.parse(data.password);
    } catch (error) {
        console.error(error);
        return { error: "Please enter a valid password." };
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        // @todo: more robust error handling
        return {
            error: "The email or password you entered is incorrect. Please try again.",
        };
    }

    revalidatePath("/", "layout");
    redirect("/b");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/b");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
