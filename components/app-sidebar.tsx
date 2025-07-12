"use client";
import { Gradient } from "whatamesh";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Projects",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Trash",
    url: "#",
    icon: Calendar,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
    gradient.play();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="min-h-44 border border-border rounded-xl transition-all duration-500 hover:grayscale-0 group relative">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <canvas id="gradient-canvas" className="rounded-xl"></canvas>
            </div>
            <div className="relative z-20 h-full flex items-center justify-center">
              <div>
                <h1 className="font-bold text-xl mt-4 text-center">
                  Welcome to PixelVibe!👋
                </h1>
                <Button
                  size="sm"
                  className="mt-2 bg-secondary-foreground/80 text-[13px] text-secondary/90"
                >
                  Give Feedback
                </Button>
              </div>
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
