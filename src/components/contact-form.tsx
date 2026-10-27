"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export const CONTACT_EMAIL = "mohamedsamir177@outlook.com";

const schema = z.object({
  name: z.string().min(2, "Enter your name").max(80),
  email: z.string().email("Enter a valid email, like you@example.com").max(120),
  message: z.string().min(10, "Write at least 10 characters so I know what it's about").max(5000),
  website: z.string().max(0).optional(),
});

type Form = z.infer<typeof schema>;

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy. Select the address and copy it manually.");
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-[13px] text-dust transition-colors hover:text-starlight"
    >
      {copied ? <Check size={13} className="text-arcturus" /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Message not sent");
      setSent(true);
      reset();
    } catch (e: unknown) {
      toast.error(`${e instanceof Error ? e.message : "Message not sent"}. Try again, or email ${CONTACT_EMAIL}.`);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-white/10 bg-hull p-8">
        <span className="block h-2.5 w-2.5 rounded-full bg-arcturus" />
        <h2 className="font-wide mt-5 text-xl font-semibold text-starlight">Message sent</h2>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-dust">
          Thanks for reaching out. I&apos;ll reply to the email you gave.
        </p>
        <Button variant="secondary" size="sm" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-lg border border-white/10 bg-hull p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[14px] text-starlight">
            Name
          </label>
          <Input id="contact-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-[13px] text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[14px] text-starlight">
            Email
          </label>
          <Input id="contact-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <p className="mt-1.5 text-[13px] text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-[14px] text-starlight">
          Message
        </label>
        <Textarea
          id="contact-message"
          rows={7}
          placeholder="What are you working on, and how can I help?"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-[13px] text-destructive">{errors.message.message}</p>}
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />
      <Button type="submit" disabled={isSubmitting}>
        <Send size={14} />
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
