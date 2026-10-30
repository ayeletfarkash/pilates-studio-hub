import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "Pilates Studio Hub | סטודיו לפילאטיס מכשירים ומזרן",
  description:
    "סטודיו בוטיק לפילאטיס מכשירים (רפורמר) ופילאטיס מזרן. קבוצות קטנות, צוות מוסמך ואווירה חמה ומזמינה.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
