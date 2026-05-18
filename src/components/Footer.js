import Link from "next/link";

const footerLinks = [
  { href: "/shop", label: "All cards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-white">
              TCG Shop <span className="text-neon-orange">BD</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/55">
              Premium anime trading cards — curated, protected, and shipped for
              collectors. Payment gateway and admin tools can plug in later
              without changing the storefront layout.
            </p>
          </div>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Explore
              </p>
              <ul className="mt-3 space-y-2">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Collect
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>Kayou official</li>
                <li>SSR / MR tiers</li>
                <li>Wave drops</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} TCG Shop BD. Demo storefront — replace
          branding and legal copy before launch.
        </p>
      </div>
    </footer>
  );
}
