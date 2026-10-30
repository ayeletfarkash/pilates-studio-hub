import type { ComponentProps } from "react";

const variants = {
  primary: "bg-clay text-white hover:bg-clay-dark",
  secondary: "border border-ink/25 text-ink hover:border-ink/50 hover:bg-sand-100",
  light: "bg-cream text-ink hover:bg-sand-100",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
