import { Loader2 } from "lucide-react"

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <Loader2 size={32} className="spinning" />
    <span>Searching movies...</span>
  </div>
)

export default LoadingSpinner
