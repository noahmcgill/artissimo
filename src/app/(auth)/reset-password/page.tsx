import { ResetPasswordForm } from "@/components/login/reset-password-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | Artissimo",
    description: "Reset your Artissimo password",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ResetPasswordPage() {
    // note: This page is accessible to any logged in user
    // I tried verifying the OTP from the search params, but by this point it has already been verified
    // If this becomes an issue, we can research a solution

    return <ResetPasswordForm />;
}
