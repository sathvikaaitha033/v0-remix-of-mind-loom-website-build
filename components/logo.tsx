"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
  showText?: boolean
}

export function Logo({ className, size = "md", animated = false, showText = false }: LogoProps) {
  const sizeMap = {
    sm: { box: "h-7 w-7", icon: 16, text: "text-sm" },
    md: { box: "h-9 w-9", icon: 20, text: "text-base" },
    lg: { box: "h-11 w-11", icon: 24, text: "text-lg md:text-xl" },
  }[size]

  return (
    <Link
      href="/"
      aria-label="MindLoom Home"
      className={cn(
        "group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md",
        className,
      )}
    >
      <span
        className={cn(
          "relative grid place-items-center rounded-md ring-1",
          "bg-primary/15 text-primary ring-primary/30",
          "shadow-sm shadow-primary/20",
          sizeMap.box,
          animated && "transition-transform duration-300 group-hover:scale-105",
        )}
        aria-hidden="true"
      >
        <svg
          width={sizeMap.icon + 6}
          height={sizeMap.icon + 6}
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
        >
          {/* interwoven loops */}
          <path
            d="M7 12c0-2.761 2.239-5 5-5 1.657 0 3 1.343 3 3 0 2.761-2.239 5-5 5-1.657 0-3-1.343-3-3Z"
            stroke="currentColor"
            strokeWidth="1.75"
            opacity="0.9"
          />
          <path
            d="M9 12c0-2.209 1.791-4 4-4 1.105 0 2 .895 2 2 0 2.209-1.791 4-4 4-1.105 0-2-.895-2-2Z"
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.55"
          />
          {/* playful spark */}
          <circle cx="16.5" cy="7.5" r="1.2" fill="currentColor" className={animated ? "animate-pulse" : ""} />
        </svg>
      </span>

      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            sizeMap.text,
            animated && "transition-colors duration-300 group-hover:text-primary",
          )}
        >
          MindLoom
        </span>
      )}
    </Link>
  )
}
