import { bookLabel, callToAction } from "@/content/landing";
import { ButtonLink } from "@/components/ui/button-link";

export function CtaSection() {
  return (
    <section id="book" aria-labelledby="book-title" className="px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="surface-dark relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-clay-dark px-6 py-16 text-center text-cream sm:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 size-72 rounded-full border border-cream/15"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -start-16 size-80 rounded-full border border-cream/15"
        />

        <div className="relative mx-auto max-w-2xl">
          <h2 id="book-title" className="font-serif text-3xl font-medium sm:text-4xl lg:text-5xl">
            {callToAction.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/90">{callToAction.description}</p>
          <ButtonLink href="#contact" variant="light" size="lg" className="mt-9">
            {bookLabel}
          </ButtonLink>
          <p className="mt-5 text-sm text-cream/80">{callToAction.note}</p>
        </div>
      </div>
    </section>
  );
}
