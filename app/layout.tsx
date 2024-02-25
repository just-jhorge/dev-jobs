import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";

import "@/styles/globals.css";
import { Navbar } from "@/components/navigation/navbar";

export const metadata: Metadata = {
  title: {
    default: "Dev Jobs",
    template: "%s | Dev Jobs",
  },
  description: "Find your dream developer job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-[350px]">
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
