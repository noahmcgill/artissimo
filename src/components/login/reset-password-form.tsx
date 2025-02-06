"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { resetPassword } from "@/app/(auth)/reset-password/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
        }

        const { error } = await resetPassword(newPassword);
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Your password has been updated successfully.",
                variant: "success",
            });
        }

        setIsLoading(false);
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleChangePassword}
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
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        placeholder="********"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="********"
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    Reset Password
                </Button>
            </div>
        </form>
    );
}
