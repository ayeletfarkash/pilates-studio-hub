import { Award, Leaf, Users } from "lucide-react";
import { benefits } from "@/content/landing";

const icons = {
  instructors: Award,
  "small-groups": Users,
  atmosphere: Leaf,
};

export function WhyUsSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-clay">למה לבחור בנו</p>
          <h2 id="about-title" className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
            סטודיו קטן, יחס אישי ותשומת לב לכל פרט
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            הקמנו את הסטודיו מתוך אהבה לפילאטיס ולאנשים. המטרה שלנו פשוטה: שתצאו מכל שיעור חזקים,
            רגועים ומחוברים יותר לגוף.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = icons[benefit.id];
            return (
              <li key={benefit.id} className="rounded-3xl bg-sand-100 p-8">
                <span className="grid size-12 place-items-center rounded-full bg-cream text-clay ring-1 ring-sand-200">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-6 font-serif text-xl font-medium">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{benefit.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
