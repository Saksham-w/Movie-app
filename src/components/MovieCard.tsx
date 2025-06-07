import { Heart, Calendar, Minus } from "lucide-react"
import Card from "./ui/Card"
import Badge from "./ui/Badge"
import type { SyntheticEvent } from "react"
import type { Movie } from "../types/movie"

const MovieCard = ({ 
  movie, 
  isFavorite, 
  onToggleFavorite 
}: { 
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void 
}) => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg"
  }

  return (
    <Card className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
          alt={`${movie.Title} poster`}
          onError={handleImageError}
        />
        <button 
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`} 
          onClick={() => onToggleFavorite(movie)}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <Minus size={16} className="text-red-500" />
          ) : (
            <Heart size={16} className="text-blue-500" />
          )}
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-year">
          <Calendar size={14} />
          <span>{movie.Year}</span>
        </div>
        <Badge variant="outline">{movie.Type}</Badge>
      </div>
    </Card>
  )
}

export default MovieCard
