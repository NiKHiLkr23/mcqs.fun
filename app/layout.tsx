import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/providers/query-provider";
import { LoadingModal } from "@/components/modal/loading-modal";
import { siteConfig } from "@/config/site";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://mcqs.fun`),
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={true}
              disableTransitionOnChange
            >
              <Toaster position="top-right" richColors />
              {children}
              <LoadingModal />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
