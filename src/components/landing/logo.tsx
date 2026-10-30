import { studio } from "@/content/landing";

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full bg-clay font-serif text-lg text-white"
      >
        P
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-semibold" dir="ltr">
          {studio.name}
        </span>
        <span className="text-xs text-muted">{studio.tagline}</span>
      </span>
    </a>
  );
}
