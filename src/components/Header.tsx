import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    // antes: sticky top-3 ...
    <header className="sticky top-0 z-50 flex justify-center px-4">
      <div className="mx-auto w-full max-w-6xl">{/* <— sin pt-3 */}
        <div className="flex items-center justify-between rounded-full bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-4 sm:px-6 py-3 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          {/* Logo -> sitio de ACM */}
          <Link
            href="https://www.acmjaveriana.tech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir al sitio de ACM Javeriana"
            className="flex items-center gap-3"
          >
            <Image
              src="/acm-logo-light.svg"
              alt="ACM — Capítulo Javeriano"
              width={140}
              height={42}
              className="h-9 w-auto block dark:hidden"
              priority
            />
            <Image
              src="/acm-logo-dark.svg"
              alt="ACM — Capítulo Javeriano"
              width={140}
              height={42}
              className="h-9 w-auto hidden dark:block"
              priority
            />
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-foreground/80 dark:text-white/90">
            <a href="#top" className="hover:opacity-100 opacity-80">Home</a>
            <a href="#articulos" className="hover:opacity-100 opacity-80">Artículos</a>
            <a href="#crear" className="hover:opacity-100 opacity-80">Crear</a>
            <a href="#trending" className="hover:opacity-100 opacity-80">Trending</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-full border border-black/10 dark:border-white/20 px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="rounded-full bg-[var(--crayon)] text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Registrarse
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}







