"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { bookLabel, navLinks } from "@/content/landing";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "./logo";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <nav aria-label="ניווט ראשי" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-ink/80 transition-colors hover:text-clay"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="#book">{bookLabel}</ButtonLink>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink hover:bg-sand-100 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="ניווט ראשי"
          className="border-t border-sand-200 bg-cream px-4 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block border-b border-sand-200 py-4 text-base font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href="#book" onClick={closeMenu} size="lg" className="mt-6 w-full">
            {bookLabel}
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
