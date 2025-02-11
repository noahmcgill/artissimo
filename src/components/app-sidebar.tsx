"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { type User } from "@supabase/supabase-js";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { TfiBlackboard } from "react-icons/tfi";
import { TbBrandNeteaseMusic } from "react-icons/tb";
import { LuCircleHelp, LuUsers } from "react-icons/lu";

const data = {
    general: {
        items: [
            {
                title: "Courses",
                url: "/courses",
                icon: TfiBlackboard,
            },
            {
                title: "Users",
                url: "/users",
                icon: LuUsers,
            },
            {
                title: "Help",
                url: "/help",
                icon: LuCircleHelp,
            },
        ],
    },
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User | null;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ user, ...props }) => {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarTrigger className="m-2 mb-6" />
            <SidebarSeparator />
            <SidebarContent className="gap-0">
                <SidebarMenuButton className="ml-2 cursor-default hover:bg-transparent">
                    <TbBrandNeteaseMusic className="text-red-500" />
                    <h1 className="text-lg font-medium">artissimo</h1>
                </SidebarMenuButton>
                <NavGroup items={data.general.items} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
