import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">404</p>
      <h1 className="font-display mt-6 text-[clamp(3rem,12vw,8rem)] leading-[0.95] text-concrete">
        Saha boş.
      </h1>
      <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted">
        Court&apos;s empty · Bu sayfa yok
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-volt px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt"
      >
        Sahaya dön · Back to court
      </Link>
    </main>
  );
}
