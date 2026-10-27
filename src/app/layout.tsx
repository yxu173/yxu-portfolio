import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Starfield, Nebula } from "@/components/cosmic";
import { ScrollProgress, BackToTop } from "@/components/chrome";
import { Toaster } from "sonner";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mohamed Samir — Software Engineer | YXU",
    template: "%s | YXU",
  },
  description: "I design, build and scale software — AI agents, RAG, .NET + Next.js backends. Based in Egypt, working worldwide.",
  metadataBase: new URL("https://yxu.dev"),
  keywords: ["Mohamed Samir", "Software Engineer Egypt", "AI agents", "RAG", "Next.js", ".NET", "Mastra", "Backend"],
  authors: [{ name: "Mohamed Samir", url: "https://yxu.dev" }],
  openGraph: {
    title: "Mohamed Samir — Building intelligent systems for a better tomorrow",
    description: "Software Engineer | AI agents, backend, system architecture. Cairo → worldwide.",
    type: "website",
    url: "https://yxu.dev",
    siteName: "YXU",
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "YXU — Mohamed Samir" }],
  },
  twitter: { card: "summary_large_image", title: "Mohamed Samir | YXU", description: "Backend + AI agent systems that survive production." },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Samir",
  url: "https://yxu.dev",
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressCountry: "EG", addressLocality: "Cairo" },
  knowsAbout: ["AI Agents", "RAG", "Next.js", ".NET", "PostgreSQL", "System Architecture"],
  sameAs: ["https://github.com/yxu173", "https://linkedin.com/in/yxu"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} min-h-screen bg-[#0B011A] text-slate-200 antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <ScrollProgress />
          <div className="pointer-events-none fixed inset-0 z-0">
            <Starfield className="absolute inset-0 h-full w-full" />
            <Nebula />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pt-24">{children}</main>
            <SiteFooter />
          </div>
          <BackToTop />
          <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "#0F112A", border: "1px solid rgba(99,102,241,0.35)", color: "#E2E8F0" } }} />
        </Providers>
      </body>
    </html>
  );
}
