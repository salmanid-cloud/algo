import Link from 'next/link';

const links = [
  ['Legacy', '#legacy'],
  ['Collection', '#collection'],
  ['Craft', '#craft'],
  ['Bespoke', '#bespoke'],
  ['Visit', '#contact']
];

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-espresso/70 backdrop-blur-xl">
      <nav className="luxury-container flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-ivory">
          Veyra & Sons
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="text-sm uppercase tracking-[0.22em] text-ivory/70 transition hover:text-brass">
              {label}
            </Link>
          ))}
        </div>
        <Link
          href="#featured"
          className="rounded-full border border-brass/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass transition hover:bg-brass hover:text-espresso"
        >
          Shop
        </Link>
      </nav>
    </header>
  );
}
