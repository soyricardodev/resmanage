import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";
import { extractRouterConfig } from "uploadthing/server";

import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/providers";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ourFileRouter } from "~/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "ResManage - Administra tu resturante",
  description:
    "ResManage es el sistema de gestión de tus restaurantes online que necesitas, desde crear y administrar tus restaurantes hasta agregar productos, menus y clientes!.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "antialised min-h-dvh bg-background font-sans",
            GeistSans.variable,
          )}
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div vaul-drawer-wrapper="">
                <div className="relative flex min-h-screen flex-col bg-background">
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </TRPCReactProvider>
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
