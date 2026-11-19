import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ cta = true, back = !cta }: { cta?: boolean; back?: boolean }) {
  return (
    <header className="border-b-2 border-line bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg border-2 border-line bg-lemon shadow-brutal-sm">
            <Image src="/icons/sloth.svg" alt="" width={20} height={20} />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Later.
          </span>
        </Link>
        {cta && back ? (
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              <Image src="/icons/arrow-left.svg" alt="" width={14} height={14} />
              Back to home
            </Link>
            <OpenListLink />
          </div>
        ) : cta ? (
          <OpenListLink />
        ) : (
          <Link href="/" className="text-sm font-semibold underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        )}
      </div>
    </header>
  );
}

function OpenListLink() {
  return (
    <Link
      href="/app"
      className="rounded-full border-2 border-line bg-accent px-5 py-2 text-sm font-bold text-accent-ink shadow-brutal-sm transition hover:-translate-y-0.5 hover:shadow-brutal"
    >
      Open my list
    </Link>
  );
}
