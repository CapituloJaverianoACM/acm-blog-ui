"use client";

import CTAButton from "@/components/CTAButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute inset-0 -z-10 hero-gradient-light dark:hero-gradient-dark" />

        <div className="relative z-10 mx-auto max-w-5xl text-center pt-16 sm:pt-20 md:pt-24">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-liguria text-foreground dark:text-white">
            Rookies Blog
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-foreground/80 dark:text-white/90">
            Un espacio para compartir nuestras experiencias y actividades como
            comunidad de estudiantes apasionados por la tecnología y la innovación!
          </p>
          
          {/* botones centrados y con más aire */}
          <div className="mt-12 sm:mt-14 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
            <CTAButton href="/blog">Leer artículos</CTAButton>
            <CTAButton href="https://www.acmjaveriana.tech/" external>
              Sobre nosotros
            </CTAButton>
          </div>
        </div>

        <p className="absolute bottom-6 left-0 right-0 text-center text-foreground/80 dark:text-white/90 text-sm">
          ¡La actitud es la clave!
        </p>
      </section>

      {/* Section 1 – Blog reading area (carousel con dots) */}
      <section className="bg-background text-foreground px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Explora nuestros artículos
          </h2>

          <div className="mt-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              rewind
              watchOverflow
              className="custom-swiper pb-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SwiperSlide key={i}>
                  <article className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 shadow-sm">
                    <div className="h-40 bg-[var(--mist)] dark:bg-[var(--ultramarine)]" />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold">Post de ejemplo {i}</h3>
                      <p className="mt-2 text-sm text-foreground/80">
                        Pequeño extracto del artículo para dar contexto y atraer clics.
                      </p>
                      <div className="mt-4">
                        <CTAButton href="/blog" size="md">
                          Leer más
                        </CTAButton>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Section 2 – Call to action (ajustada con gradiente del tamaño correcto) */}
      <section className="relative px-6 py-[120px] text-center flex items-center justify-center">
        <div className="absolute inset-0 -z-10 hero-gradient-light dark:hero-gradient-dark" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-liguria text-foreground dark:text-white">
            Crea tu blog ahora mismo
          </h2>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-foreground/80 dark:text-white/90 max-w-3xl mx-auto">
            Dale voz a tus ideas, experiencias y proyectos tecnológicos. 
          </p>
          <div className="mt-10">
            <CTAButton href="/editor" size="lg">
              Empezar ahora
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Section 3 – Trending topics (tarjetas más altas, estáticas) */}
      <section className="bg-background text-foreground px-6 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Temas trending</h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["AI", "Web3", "Ciberseguridad", "Data Science"].map((t) => (
              <a
                key={t}
                href="/blog"
                className="group block h-full rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 transition hover:shadow-lg"
              >
                {/* Imagen o gradiente más ALTO */}
                <div className="h-56 sm:h-64 lg:h-[300px] bg-gradient-to-br from-[var(--mist)] to-[var(--crayon)] dark:from-[var(--electric)] dark:to-[var(--night)]" />
                {/* Cuerpo */}
                <div className="p-6 sm:p-7 lg:p-8">
                  <h3 className="text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-foreground/70">
                    Artículos y recursos populares sobre {t}.
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

