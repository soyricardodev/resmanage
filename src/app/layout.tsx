import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import type { Metadata, Viewport } from "next";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/providers";

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
