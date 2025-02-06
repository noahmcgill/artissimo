import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/lib/utils/supabase/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | Artissimo",
    description: "Welcome to Artissimo",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <SidebarProvider>
            <AppSidebar user={data?.user} />
            <div className="flex w-full flex-col p-4 pt-0 md:pt-4">
                <div className="flex w-full flex-row justify-between py-4 md:py-0">
                    <div className="block md:hidden">logo</div>
                    <SidebarTrigger className="flex md:hidden" />
                </div>
                <SidebarInset>
                    <div className="flex flex-1 flex-col gap-4">{children}</div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
