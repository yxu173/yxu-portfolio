"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CosmicAudioProvider } from "@/components/audio/cosmic-audio";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <CosmicAudioProvider>{children}</CosmicAudioProvider>
    </NextThemesProvider>
  );
}
