import type { ReactNode } from "react"

const Badge = ({ children, variant = "default", className = "" }: { children: ReactNode, variant?: "default" | "outline" | "secondary", className?: string }) => {
    const variantClasses = {
      default: "badge-default",
      outline: "badge-outline",
      secondary: "badge-secondary",
    }
  
    return <span className={`badge ${variantClasses[variant]} ${className}`}>{children}</span>
  }
  
  export default Badge
  