import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: "primary" | "ghost" | "danger" };

export function PrimaryButton({ children, variant = "primary", className = "", ...props }: Props) {
  return (
    <button className={`primary-button ${variant} ${className}`} {...props}>
      <span>{children}</span><ArrowRight size={20} aria-hidden="true" />
    </button>
  );
}
