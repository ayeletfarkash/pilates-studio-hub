import Image from "next/image";
import { bookLabel, hero } from "@/content/landing";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-20 lg:gap-20 lg:py-24">
        <div>
          <p className="text-sm font-medium tracking-wide text-clay">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-4 text-balance font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#book" size="lg">
              {bookLabel}
            </ButtonLink>
            <ButtonLink href="#classes" size="lg" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -start-5 h-3/4 w-3/4 rounded-t-full bg-sage-light"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl bg-sand-200">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
