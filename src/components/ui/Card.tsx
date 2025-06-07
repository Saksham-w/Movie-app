import type { ReactNode, HTMLAttributes } from "react"

const Card = ({ children, className = "", ...props }: { children: ReactNode, className?: string } & HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={`card ${className}`} {...props}>
        {children}
      </div>
    )
  }
  
  export default Card
  