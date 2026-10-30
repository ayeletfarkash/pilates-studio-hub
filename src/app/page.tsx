import { ClassesSection } from "@/components/landing/classes-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Hero } from "@/components/landing/hero";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WhyUsSection } from "@/components/landing/why-us-section";

export default function Home() {
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
      >
        דילוג לתוכן הראשי
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ClassesSection />
        <WhyUsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
