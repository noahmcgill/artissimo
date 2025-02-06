import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | Artissimo",
    description: "Welcome to Artissimo",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <Toaster />
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
