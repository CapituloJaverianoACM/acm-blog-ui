"use client";

import Link from "next/link";
import Image from "next/image";

type Item = {
  href: string;
  label: string;
  icon: string; // ruta pública
  external?: boolean;
};

const items: Item[] = [
  { href: "https://instagram.com/tu_cuenta", label: "Instagram", icon: "/icons/instagram.svg", external: true },
  { href: "https://x.com/tu_cuenta",        label: "X",         icon: "/icons/x.svg",         external: true },
  { href: "https://github.com/tu_org",      label: "GitHub",    icon: "/icons/github.svg",    external: true },
  { href: "https://www.acmjaveriana.tech/", label: "Website",    icon: "/icons/globe.svg",     external: true },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Redes sociales" className={className}>
      <ul className="flex items-center gap-5">
        {/* Logo ACM (link a home o al site que prefieras) */}
        <li>
          <Link href="https://www.acmjaveriana.tech/" aria-label="ACM – sitio web" target="_blank" rel="noopener noreferrer"
            className="inline-flex rounded-full ring-[var(--crayon)]/40 focus:outline-none focus-visible:ring-2">
            <Image
              src="/acm-logo-dark.png"
              alt="ACM"
              width={32}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </li>

        {/* Íconos negros */}
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              aria-label={it.label}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noopener noreferrer" : undefined}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--crayon)]/40"
            >
              <Image
                src={it.icon}
                alt={it.label}
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
