import type { ReactNode, ButtonHTMLAttributes } from "react"

const Button = ({ children, variant = "primary", size = "medium", disabled = false, className = "", ...props }: { 
  children: ReactNode, 
  variant?: "primary" | "secondary" | "outline", 
  size?: "small" | "medium" | "large", 
  disabled?: boolean, 
  className?: string 
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const baseClasses = "btn"
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
    }
    const sizeClasses = {
      small: "btn-sm",
      medium: "btn-md",
      large: "btn-lg",
    }
  
    const classes = [baseClasses, variantClasses[variant], sizeClasses[size], disabled && "btn-disabled", className]
      .filter(Boolean)
      .join(" ")
  
    return (
      <button className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    )
  }
  
  export default Button
  