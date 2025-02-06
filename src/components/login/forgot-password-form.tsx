"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { sendResetPasswordEmail } from "@/app/(auth)/forgot-password/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setIsLoading(true);

        const { error } = await sendResetPasswordEmail(formData);
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Email sent",
                description:
                    "Check your email for a link to reset your password.",
                variant: "success",
            });
        }

        setIsLoading(false);
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSendEmail}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forgot your password?</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to receive a link to reset your
                    password.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your.name@company.com"
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    Send Email
                </Button>
            </div>
        </form>
    );
}
