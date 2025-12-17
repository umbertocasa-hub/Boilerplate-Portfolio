import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Umberto Casa | Portfolio",
  description: "Senior Developer & Tech Lead specializing in Modern Web Technologies, Cloud Architecture, and Digital Transformation.",
  icons: {
    icon: '/brand/logo_1.png',
  },
  keywords: ["Portfolio", "Sviluppo Web", "DevOps", "Cybersecurity", "Fotografia", "Next.js", "React"],
  authors: [{ name: "Umberto Casa" }],
  openGraph: {
    title: "Umberto Casa | Portfolio",
    description: "Sviluppatore Full Stack, Sistemista & Fotografo.",
    url: "https://umbertocasa.it",
    siteName: "Umberto Casa Portfolio",
    locale: "it_IT",
    type: "website",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0c0a09",
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RippleBackground } from "@/components/ui/ripple-background";
import { SecurityWarning } from "@/components/SecurityWarning";
import { ClickEffects } from "@/components/ui/ClickEffects";


// ... (Metadata stays same)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-50 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SecurityWarning />
          <RippleBackground className="fixed inset-0 -z-10 hidden dark:block pointer-events-none" />
          <ClickEffects />

          <Navbar />
          <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
