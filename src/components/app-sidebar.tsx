"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { FaHome } from "react-icons/fa";
import { type User } from "@supabase/supabase-js";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";

const data = {
    general: {
        title: "General",
        items: [
            {
                title: "Home",
                url: "/",
                icon: FaHome,
            },
        ],
    },
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User | null;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ user, ...props }) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <h1 className="my-3 text-center text-2xl font-bold">
                    Artissimo
                </h1>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <NavGroup
                    title={data.general.title}
                    items={data.general.items}
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
