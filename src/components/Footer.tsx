import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Gradiente original + fade corto arriba */}
      <div className="absolute inset-0 -z-10 hero-gradient-light dark:hero-gradient-dark fade-top-short" />

      {/* ↓ Menos alto: antes py-12, ahora py-6 en mobile y py-8 en desktop */}
      <div className="mx-auto max-w-6xl px-6 py-6 md:py-8 flex items-center justify-between">
        {/* Logo ACM */}
        <div className="flex items-center gap-3">
          <Image
            src="/acm-logo-light.svg"
            alt="ACM"
            width={140}
            height={42}
            className="h-8 w-auto block dark:hidden"
            priority
          />
          <Image
            src="/acm-logo-dark.svg"
            alt="ACM"
            width={140}
            height={42}
            className="h-8 w-auto hidden dark:block"
            priority
          />
        </div>

        {/* Iconos sociales */}
        <nav className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/acmjaveriana/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de ACM Javeriana"
          >
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <a
            href="https://www.acmjaveriana.tech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sitio web de ACM Javeriana"
          >
            <Image
              src="/icons/globe.png"
              alt="Website"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <a
            href="https://twitter.com/acmjaveriana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) de ACM Javeriana"
          >
            <Image
              src="/icons/x.png"
              alt="X"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <a
            href="https://github.com/CapituloJaverianoACM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de ACM Javeriana"
          >
            <Image
              src="/icons/github.png"
              alt="GitHub"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
        </nav>
      </div>
    </footer>
  );
}




  


