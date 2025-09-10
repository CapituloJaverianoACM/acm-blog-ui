"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { useMemo } from "react";

function PlaceholderLogo() {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <span className="sr-only">ACM</span>
      <svg
        width="64"
        height="24"
        viewBox="0 0 64 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="text-foreground"
      >
        <rect width="64" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <text x="32" y="16" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="12" fill="currentColor">
          ACM
        </text>
      </svg>
    </div>
  );
}

export default function Header() {

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2" aria-label="Ir a blog">
          {/* Light theme → show LIGHT logo (as requested) */}
          <Image src="/acm-logo-light.png" alt="ACM logo" width={196} height={58} className="h-12 sm:h-14 w-auto block dark:hidden" priority />
          {/* Dark theme → show DARK logo */}
          <Image src="/acm-logo-dark.png" alt="ACM logo" width={196} height={58} className="h-12 sm:h-14 w-auto hidden dark:block" priority />
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm sm:text-base font-medium text-foreground/90">Cuenta</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


