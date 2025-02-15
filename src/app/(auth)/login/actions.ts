"use server";

import { USER_METADATA_COOKIES_KEY } from "@/lib/constants";
import { createClient } from "@/lib/utils/supabase/server";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

    const { data: user, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        // @todo: more robust error handling
        return {
            error: "The email or password you entered is incorrect. Please try again.",
        };
    }

    // @todo: handle this error
    const metadata = await api.user.getByEmail({
        email: user.user.email ?? "",
    });
    const cookieStore = await cookies();

    cookieStore.set(
        USER_METADATA_COOKIES_KEY,
        JSON.stringify({
            name: metadata?.name ?? "",
            role: metadata?.role ?? "",
        }),
        {
            sameSite: "lax",
            maxAge: user.session.expires_at,
        },
    );

    revalidatePath("/", "layout");
    redirect("/dash");
}

export async function logout() {
    const supabase = await createClient();

    // @todo: handle error
    await supabase.auth.signOut();

    const cookieStore = await cookies();
    cookieStore.delete(USER_METADATA_COOKIES_KEY);

    redirect("/login");
}
