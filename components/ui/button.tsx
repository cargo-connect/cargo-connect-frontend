import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Button({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-colors",
        // Variant styles
        variant === "primary" && "bg-primary text-white hover:bg-primary/90",
        variant === "secondary" && "bg-gray-100 text-gray-800 hover:bg-gray-200",
        variant === "outline" && "border border-primary text-primary hover:bg-primary/10",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100",
        variant === "link" && "text-primary hover:underline",
        variant === "danger" && "bg-red-500 text-white hover:bg-red-600",
        // Size styles
        size === "sm" && "text-sm px-3 py-1.5",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

