import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 pt-6">
      <div className="rounded-lg border border-white/10 bg-hull px-6 py-20 text-center">
        <Link href="/" className="inline-block" aria-label="YXU home">
          <LogoMark width={120} height={42} className="mx-auto" />
        </Link>
        <h1 className="mt-6 font-mono text-6xl font-semibold text-arcturus">404</h1>
        <p className="font-wide mt-2 text-lg font-medium text-starlight">Lost in the cosmos</p>
        <p className="mx-auto mt-2 max-w-xs text-[13px] text-dust">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="mt-6 inline-block"><Button variant="secondary">Go home</Button></Link>
      </div>
    </div>
  );
}
