import { ForgotPasswordForm } from "@/components/login/forgot-password-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | Artissimo",
    description: "Reset your Artissimo password",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
