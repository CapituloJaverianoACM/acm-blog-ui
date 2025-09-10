import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="hero-gradient-light dark:hero-gradient-dark">
        <div className="mx-auto max-w-6xl px-6 py-10 flex items-center justify-between">
          {/* Logo ACM */}
          <div className="flex items-center gap-3">
            <Image
              src="/acm-logo-light.png"
              alt="ACM"
              width={140}
              height={42}
              className="h-9 w-auto block dark:hidden"
            />
            <Image
              src="/acm-logo-dark.png"
              alt="ACM"
              width={140}
              height={42}
              className="h-9 w-auto hidden dark:block"
            />
          </div>

          {/* Iconos sociales */}
          <nav className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/acmjaveriana/"
              target="_blank"
              rel="noopener noreferrer"
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
            >
              <Image
                src="/icons/x.png"
                alt="X"
                width={20}
                height={20}
                className="h-4.5 w-4.5 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
              />
            </a>
            <a
              href="https://github.com/CapituloJaverianoACM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/github.png"
                alt="GitHub"
                width={20}
                height={20}
                className="h-6 w-6 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


  


