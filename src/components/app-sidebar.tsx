"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenuButton,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { TbBrandNeteaseMusic } from "react-icons/tb";
import { LuApple, LuBookOpen, LuCircleHelp, LuUsers } from "react-icons/lu";
import { type ArtissimoUser } from "@/lib/types/user";

const data = {
    general: {
        items: [
            {
                title: "Courses",
                url: "/courses",
                icon: LuApple,
            },
            {
                title: "Books",
                url: "/books",
                icon: LuBookOpen,
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
    user: ArtissimoUser | null;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ user, ...props }) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarTrigger className="m-2 mb-6" />
            <SidebarSeparator />
            <SidebarContent className="gap-0">
                <SidebarMenuButton className="ml-2 cursor-default hover:bg-transparent active:bg-transparent">
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
