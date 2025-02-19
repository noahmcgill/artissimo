"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/(auth)/login/actions";
import { useToast } from "@/lib/hooks/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ArtissimoInput } from "../inputs/input";
import { useSupabaseSearchParams } from "@/lib/hooks/use-supabase-search-params";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchParams = useSupabaseSearchParams();

    useEffect(() => {
        const errDesc = searchParams.get("error_description");
        const message = searchParams.get("message");

        if (errDesc && errDesc !== "") {
            toast({
                title: "Error",
                description: errDesc,
                variant: "destructive",
            });
        } else if (message && message !== "") {
            toast({
                title: "Success",
                description: message,
            });
        }
    }, [searchParams, toast]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        const { error } = await login(formData);
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        }
        setIsLoading(false);
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <ArtissimoInput
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.name@company.com"
                    required
                />
                <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="********"
                        pattern=".{8,}"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="animate-spin" />}
                    Login
                </Button>
            </div>
        </form>
    );
}
