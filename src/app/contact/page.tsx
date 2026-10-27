import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ContactForm, CopyEmail, CONTACT_EMAIL } from "@/components/contact-form";
import { SectionHeading } from "@/components/motion";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mohamed Samir about a project, a collaboration or anything he's built.",
};

const channels = [
  { icon: GithubIcon, label: "GitHub", value: "github.com/yxu173", href: "https://github.com/yxu173" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/yxu", href: "https://linkedin.com/in/yxu" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-6">
      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="font-wide text-4xl font-semibold text-starlight md:text-5xl">Contact</h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-dust">
            Have an idea, a project or a question about something I&apos;ve built? Send a message, or reach me directly.
          </p>

          <ul className="mt-10 max-w-md divide-y divide-white/10 border-y border-white/10">
            <li className="flex items-center gap-4 py-4">
              <Mail size={18} className="shrink-0 text-arcturus" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-dust">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[15px] text-starlight hover:text-arcturus">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <CopyEmail />
            </li>
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-4">
                  <c.icon size={18} className="shrink-0 text-dust group-hover:text-arcturus" />
                  <div>
                    <p className="text-[13px] text-dust">{c.label}</p>
                    <p className="text-[15px] text-starlight group-hover:text-arcturus">{c.value}</p>
                  </div>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-4">
              <MapPin size={18} className="shrink-0 text-dust" />
              <div>
                <p className="text-[13px] text-dust">Based in</p>
                <p className="text-[15px] text-starlight">Cairo, Egypt (UTC+2)</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:pt-2">
          <ContactForm />
        </div>
      </section>

      <section className="mt-24 max-w-3xl">
        <SectionHeading title="Questions people ask" />
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] text-starlight [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-[20px] leading-none text-dust transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-dust">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
