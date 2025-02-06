import { LoginForm } from "@/components/login/login-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Artissimo",
    description: "Login to your Artissimo account",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function LoginPage() {
    return <LoginForm />;
}
