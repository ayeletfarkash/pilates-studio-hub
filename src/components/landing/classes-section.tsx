import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { classes, type StudioClass } from "@/content/landing";

export function ClassesSection() {
  return (
    <section id="classes" aria-labelledby="classes-title" className="bg-sand-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-clay">השיעורים שלנו</p>
          <h2 id="classes-title" className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
            שתי דרכים לחזק, לשחרר ולהתחבר לגוף
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            בין אם אתם מעדיפים את ההתנגדות של המכשיר או את הפשטות של המזרן — בכל שיעור תקבלו הדרכה
            צמודה והתאמה לרמה שלכם.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {classes.map((studioClass, index) => (
            <ClassCard key={studioClass.id} studioClass={studioClass} accent={index === 0 ? "clay" : "sage"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassCard({ studioClass, accent }: { studioClass: StudioClass; accent: "clay" | "sage" }) {
  const titleId = `class-${studioClass.id}-title`;
  const labelClass = accent === "clay" ? "bg-clay text-white" : "bg-sage text-white";

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col overflow-hidden rounded-3xl bg-cream shadow-sm ring-1 ring-sand-200"
    >
      <div className="relative aspect-[3/2] bg-sand-200">
        <Image
          src={studioClass.image.src}
          alt={studioClass.image.alt}
          fill
          sizes="(min-width: 1152px) 544px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${labelClass}`}
        >
          {studioClass.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 id={titleId} className="font-serif text-2xl font-medium">
          {studioClass.title}
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{studioClass.description}</p>

        <details className="group mt-6">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink/25 px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink/50 hover:bg-sand-100">
            <span className="group-open:hidden">פרטים נוספים</span>
            <span className="hidden group-open:inline">הסתרת פרטים</span>
            <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-sand-200 pt-5 sm:grid-cols-2">
            {studioClass.details.map((detail) => (
              <div key={detail.term}>
                <dt className="text-xs font-medium text-muted">{detail.term}</dt>
                <dd className="mt-1 text-sm">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </article>
  );
}
