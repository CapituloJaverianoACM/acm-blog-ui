"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import React from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  size?: "md" | "lg";
  className?: string;
  external?: boolean; // open in new tab
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--crayon)] shadow-sm hover:shadow-md hover:scale-105";

const sizeClasses = {
  md: "px-5 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function CTAButton({
  href,
  onClick,
  children,
  disabled,
  size = "lg",
  className,
  external,
}: Props) {
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    // 🎯 estilo mockup: pill navy con texto blanco
    "bg-[var(--night)] text-white hover:bg-[var(--ultramarine)]",
    "dark:bg-[var(--night)] dark:hover:bg-[var(--ultramarine)]",
    disabled && "opacity-60 cursor-not-allowed hover:scale-100",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={disabled}
        className={classes}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

