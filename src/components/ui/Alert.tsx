import type { ReactNode } from "react"

const Alert = ({ children, variant = "default", className = "" }: { children: ReactNode, variant?: "default" | "error" | "success" | "warning", className?: string }) => {
    const variantClasses = {
      default: "alert-default",
      error: "alert-error",
      success: "alert-success",
      warning: "alert-warning",
    }
  
    return <div className={`alert ${variantClasses[variant]} ${className}`}>{children}</div>
  }
  
  export default Alert
  