import { Film, Star } from "lucide-react"
import MovieCard from "./MovieCard"
import Card from "./ui/Card"
import type { Movie } from "../types/movie"

const MovieList = ({ 
  movies, 
  favorites, 
  onToggleFavorite, 
  title 
}: { 
  movies: Movie[]
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
  title: string 
}) => {
  if (movies.length === 0) {
    return (
      <Card className="empty-state">
        <Film size={48} />
        <p>No movies to display</p>
      </Card>
    )
  }

  return (
    <div className="movie-list-section">
      <h2 className="section-title">
        <Star size={24} />
        {title} ({movies.length})
      </h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList
