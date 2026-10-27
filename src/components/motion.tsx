import { ReactNode } from "react";

// Sections render in place: no scroll-triggered entrances. The hero owns the
// page's only orchestrated motion. `delay` is accepted for call-site compatibility.
export function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SectionHeading({
  title,
  desc,
  align = "left",
}: {
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="font-wide text-2xl font-semibold text-starlight md:text-3xl">{title}</h2>
      {desc ? <p className="mt-2 text-[15px] leading-relaxed text-dust">{desc}</p> : null}
    </div>
  );
}
