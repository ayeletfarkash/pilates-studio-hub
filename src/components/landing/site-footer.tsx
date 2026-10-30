import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contact, navLinks, socialLinks, studio } from "@/content/landing";

// lucide-react no longer ships brand icons, so these are simple inline glyphs.
const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
      <path d="M4 20l1.2-3.8A8 8 0 1 1 8 19l-4 1Z" strokeLinejoin="round" />
      <path
        d="M9.2 8.6c.2-.4.5-.4.8-.4h.4c.2 0 .3.1.4.3l.6 1.4c.1.2 0 .4-.1.5l-.4.5c.5 1 1.3 1.8 2.3 2.3l.5-.4c.1-.1.3-.2.5-.1l1.4.6c.2.1.3.2.3.4v.4c0 .3 0 .6-.4.8-.5.3-1.2.5-2 .2a8 8 0 0 1-4.5-4.5c-.3-.8-.1-1.5.2-2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
};

export function SiteFooter() {
  return (
    <footer id="contact" className="surface-dark bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="font-serif text-2xl" dir="ltr" lang="en">
            {studio.name}
          </p>
          <p className="mt-1 text-sm text-cream/70">{studio.tagline}</p>
          <p className="mt-5 max-w-xs leading-relaxed text-cream/80">
            פילאטיס מכשירים ומזרן בקבוצות קטנות, באווירה חמה ומקצועית.
          </p>

          <ul className="mt-6 flex gap-3" aria-label="רשתות חברתיות (יתווספו בקרוב)">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <span
                  role="img"
                  aria-label={`${social.label} — קישור יתווסף בקרוב`}
                  title="קישור יתווסף בקרוב"
                  className="grid size-10 place-items-center rounded-full border border-cream/25 text-cream/80"
                >
                  {socialIcons[social.id]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="ניווט בתחתית העמוד">
          <h2 className="text-sm font-semibold text-cream">ניווט</h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-cream/80 transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-cream">צור קשר</h2>
          <ul className="mt-4 space-y-4 text-cream/80">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cream/60" />
              <span>{contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cream/60" />
              <span dir="ltr">{contact.phone}</span>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cream/60" />
              <span dir="ltr">{contact.email}</span>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cream/60" />
              <span>
                {contact.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-cream/60">פרטי הקשר הם לדוגמה בלבד.</p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-cream/60 sm:px-6">
          © 2026 <span dir="ltr">{studio.name}</span>. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
