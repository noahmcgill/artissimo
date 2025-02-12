"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { type IconType } from "react-icons/lib";

interface NavGroupItem {
    title: string;
    url: string;
    icon?: IconType;
    isActive?: boolean;
}

interface NavGroupProps {
    title?: string;
    items: NavGroupItem[];
}

export const NavGroup: React.FC<NavGroupProps> = ({ title, items }) => {
    return (
        <SidebarGroup>
            {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) => {
                    const href = `/dash${item.url}`;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                href={href}
                                asChild
                            >
                                <Link href={href}>
                                    {item.icon && <item.icon />}
                                    <span className="text-medium">
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
};
