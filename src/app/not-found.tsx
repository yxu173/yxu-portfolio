"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#120a33] via-[#0d1030] to-[#0B011A] px-6 py-16 text-center">
        {/* portal ring */}
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full border-2 border-indigo-300/50 shadow-[0_0_80px_rgba(129,140,248,0.5)]" />
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full border border-fuchsia-300/20 scale-110" />
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="absolute h-[2px] w-[2px] rounded-full bg-white animate-[twinkle_2.8s_ease-in-out_infinite]" style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 70}%`, animationDelay: `${(i % 9) * 0.3}s` }} />
        ))}
        {/* mountain + person */}
        <svg viewBox="0 0 500 120" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none">
          <path d="M0,120 L180,40 L260,80 L340,30 L500,120 Z" fill="#060213" />
        </svg>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <div className="h-8 w-4 rounded-t-full bg-black" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative pt-40">
          <Link href="/" className="inline-block" aria-label="YXU home">
            <LogoMark width={120} height={42} className="mx-auto opacity-95" />
          </Link>
          <h1 className="mt-4 text-6xl font-bold tracking-tight text-white text-glow">404</h1>
          <p className="mt-2 text-lg font-medium text-white">Lost in the cosmos</p>
          <p className="mx-auto mt-2 max-w-xs text-[13px] text-slate-400">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="mt-6 inline-block"><Button variant="secondary">Go Home</Button></Link>
        </motion.div>
      </div>
    </div>
  );
}
