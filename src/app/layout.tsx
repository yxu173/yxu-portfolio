import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Starfield } from "@/components/cosmic";
import { BackToTop } from "@/components/chrome";
import { RadioPlayer } from "@/components/audio/radio-player";
import { Toaster } from "sonner";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mohamed Samir — Full-Stack Engineer | YXU",
    template: "%s | YXU",
  },
  description: "Mohamed Samir, full-stack engineer in Cairo building AI products end to end: agents, RAG, backends and interfaces. Full-stack engineer at Zynda AI.",
  metadataBase: new URL("https://yxu.vercel.app"),
  keywords: ["Mohamed Samir", "Full-Stack Engineer Egypt", "AI agents", "RAG", "Next.js", "Mastra", "TypeScript", "Zynda AI"],
  authors: [{ name: "Mohamed Samir", url: "https://yxu.vercel.app" }],
  openGraph: {
    title: "Mohamed Samir — Full-stack engineer building AI products",
    description: "AI products end to end, from the agent to the last pixel. Based in Cairo, Egypt.",
    type: "website",
    url: "https://yxu.vercel.app",
    siteName: "YXU",
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "YXU — Mohamed Samir" }],
  },
  twitter: { card: "summary_large_image", title: "Mohamed Samir | YXU", description: "Full-stack engineer building AI products, from the agent to the last pixel." },
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
  url: "https://yxu.vercel.app",
  jobTitle: "Full-Stack Engineer",
  worksFor: { "@type": "Organization", name: "Zynda AI", url: "https://zynda.ai" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Menofia University" },
  address: { "@type": "PostalAddress", addressCountry: "EG", addressLocality: "Cairo" },
  knowsAbout: ["AI Agents", "RAG", "Next.js", "TypeScript", "Mastra", "PostgreSQL"],
  sameAs: ["https://github.com/yxu173", "https://linkedin.com/in/yxu"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${archivo.variable} ${mono.variable} min-h-screen bg-space text-starlight antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <div className="pointer-events-none fixed inset-0 z-0">
            <Starfield className="absolute inset-0 h-full w-full" />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pt-24">{children}</main>
            <SiteFooter />
          </div>
          <BackToTop />
          <RadioPlayer />
          <Toaster theme="dark" position="bottom-center" offset={{ bottom: 80 }} toastOptions={{ style: { background: "#0F1420", border: "1px solid rgba(236,232,223,0.14)", color: "#ECE8DF" } }} />
        </Providers>
      </body>
    </html>
  );
}
