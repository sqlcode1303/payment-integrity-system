"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, GitMerge, LayoutDashboard, Settings, Wallet, ShieldCheck } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Claims Processing",
      icon: FileText,
      href: "/claims-processing",
    },
    {
      title: "Rules Management",
      icon: GitMerge,
      href: "/rules-management",
    },
    {
      title: "Vendor Management",
      icon: Settings,
      href: "/vendor-management",
    },
    {
      title: "Overpayments",
      icon: Wallet,
      href: "/overpayments",
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/analytics",
    },
    {
      title: "Admin",
      icon: ShieldCheck,
      href: "/admin",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="font-semibold">Payment Integrity</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
