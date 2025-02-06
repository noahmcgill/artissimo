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
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton tooltip={item.title} asChild>
                            <Link href={item.url}>
                                {item.icon && <item.icon />}
                                <span className="text-md">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};
