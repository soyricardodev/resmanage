"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CookingPot } from "lucide-react";

import { dashboardConfig } from "~/config/dashboard";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function DesktopMenu() {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CookingPot className="size-6" />
            <span className="">ResManage</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto size-8">
            <Bell className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {dashboardConfig.sidebarNav.map(({ items }) => {
              return (
                <>
                  {items.map(({ title, href, icon: Icon }) => (
                    <Link
                      key={title}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        pathname === href
                          ? "text-primary hover:text-primary/80 bg-muted"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="">{title}</span>
                    </Link>
                  ))}
                </>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full" disabled>
                Coming soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
