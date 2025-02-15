import { auth } from "@/lib/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";
    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = next;

    if (token_hash && type) {
        const { error } = await auth.verifyOtp({
            type,
            token_hash,
        });
        if (!error) {
            return NextResponse.redirect(redirectTo);
        }
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = "/auth/auth-code-error";
    return NextResponse.redirect(redirectTo);
};
