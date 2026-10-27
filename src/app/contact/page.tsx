"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, MapPin, AtSign, Globe, Send, CheckCircle2, Clock, ShieldCheck, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Reveal, SectionHeading } from "@/components/motion";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Enter a valid email").max(120),
  subject: z.string().max(140).optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell me a bit more (10+ chars)").max(5000),
  website: z.string().max(0).optional(),
});

type Form = z.infer<typeof schema>;

const channels = [
  { icon: Mail, label: "Email — fastest", value: "yxu@proton.me", href: "mailto:yxu@proton.me", note: "avg. reply 14h" },
  { icon: MapPin, label: "Location", value: "Cairo, Egypt (EET)", href: undefined, note: "async-first worldwide" },
  { icon: AtSign, label: "LinkedIn", value: "linkedin.com/in/yxu", href: "https://linkedin.com/in/yxu", note: "DMs open" },
  { icon: Globe, label: "GitHub", value: "github.com/yxu173", href: "https://github.com/yxu173", note: "320+ stars" },
];

function CopyEmail() {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText("yxu@proton.me"); setOk(true); toast.success("Email copied"); setTimeout(() => setOk(false), 1500); }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-slate-300 hover:text-white hover:border-indigo-400/50 transition"
    >
      {ok ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />} yxu@proton.me
    </button>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Send failed");
      setSent(true);
      toast.success("Message sent — I'll reply within 48h.");
      reset();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Couldn't send. Email me directly.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-2">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Contact — 1 slot for Oct 2026" title="Tell me about your project" desc="3 lines is enough: what you're building, deadline, budget range. I'll reply with a scoped plan + fixed quote." />
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyEmail />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-slate-400"><Clock size={12} /> replies in &lt;48h</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-slate-400"><ShieldCheck size={12} /> NDA-friendly</span>
          </div>
          <div className="mt-5 space-y-3">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <a href={c.href} className={`card-hover flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 ${!c.href ? "pointer-events-none" : ""}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/15 text-indigo-200">
                    <c.icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500">{c.label}</span>
                    <span className="block truncate text-[13.5px] text-slate-100">{c.value}</span>
                    <span className="block text-[11px] text-slate-500">{c.note}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-[12.5px] leading-relaxed text-slate-400">
            <span className="font-medium text-white">Prefer a call?</span> Mention 2–3 times (EET) in your message and I&apos;ll send a 20-min link. No pitch decks needed.
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-white/10 bg-[#0F112A]/80 p-6 md:p-7 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(99,102,241,0.4)]">
            {!sent ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] text-slate-400">Name *</label>
                    <Input placeholder="Jane Doe" {...register("name")} />
                    {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-slate-400">Email *</label>
                    <Input type="email" placeholder="jane@company.com" {...register("email")} />
                    {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] text-slate-400">Subject</label>
                    <Input placeholder="RAG over our docs…" {...register("subject")} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-slate-400">Budget range</label>
                    <select {...register("budget")} className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-[13px] text-slate-200 focus:outline-none focus:border-indigo-400/60">
                      <option value="" className="bg-[#0F112A]">Select…</option>
                      <option className="bg-[#0F112A]">$1–3k (small fix)</option>
                      <option className="bg-[#0F112A]">$3–8k (feature)</option>
                      <option className="bg-[#0F112A]">$8k+ (system)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] text-slate-400">Project details *</label>
                  <Textarea rows={6} placeholder="What are you building? Deadline? Links to docs/repo help a lot…" {...register("message")} />
                  {errors.message && <p className="mt-1 text-[11px] text-red-400">{errors.message.message}</p>}
                </div>
                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>◌</motion.span> : <><Send size={14} /> Send — replies in &lt;48h</>}
                </Button>
                <p className="text-center text-[11px] text-slate-600">No spam. No list. Your message goes straight to my inbox.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center py-14 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300"><CheckCircle2 size={26} /></span>
                <h3 className="mt-4 text-lg font-semibold text-white">Received ✓</h3>
                <p className="mt-1 max-w-xs text-[13px] text-slate-400">Thanks — I&apos;ll reply within 48h with a scoped plan. Urgent? Email yxu@proton.me directly.</p>
                <Button variant="secondary" size="sm" className="mt-5" onClick={() => setSent(false)}>Send another</Button>
              </motion.div>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
