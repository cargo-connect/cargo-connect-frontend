import type React from "react"
import { cn } from "@/lib/utils"

interface IconLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  label: React.ReactNode
  description?: React.ReactNode
  iconBackground?: boolean
}

export function IconLabel({ className, icon, label, description, iconBackground = true, ...props }: IconLabelProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <div className={cn("mr-3", iconBackground && "bg-primary/10 p-2 rounded-lg")}>{icon}</div>
      <div>
        <div className="font-medium">{label}</div>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  )
}

