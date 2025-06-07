import { useState, useCallback } from "react"
import { Search, AlertCircle } from "lucide-react"
import type { Movie } from "./types/movie"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import LoadingSpinner from "./components/LoadingSpinner"
import Alert from "./components/ui/Alert"
import Button from "./components/ui/Button"
import Card from "./components/ui/Card"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { searchMovies as searchMoviesAPI } from "./utils/API"
import "./App.css"

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [favorites, setFavorites] = useLocalStorage<Movie[]>("movieFavorites", [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState("all")
  const [hasSearched, setHasSearched] = useState(false)

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setSearchQuery(query)
    setHasSearched(true)

    try {
      const data = await searchMoviesAPI(query)
      setMovies(data)
      setError("")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      setFavorites((prevFavorites) => {
        const isFavorite = prevFavorites.some((fav) => fav.imdbID === movie.imdbID)

        if (isFavorite) {
          return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID)
        } else {
          return [...prevFavorites, movie]
        }
      })
    },
    [setFavorites],
  )

  const displayMovies = viewMode === "favorites" ? favorites : movies

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>🎬 Movie Search & Favorites</h1>
          <p>Search for movies and build your personal favorites collection</p>
        </div>

        <SearchBar onSearch={searchMovies} loading={loading} />

        <div className="view-toggle">
          <div className="toggle-buttons">
            <Button variant={viewMode === "all" ? "primary" : "secondary"} onClick={() => setViewMode("all")}>
              Search Results
            </Button>
            <Button
              variant={viewMode === "favorites" ? "primary" : "secondary"}
              onClick={() => setViewMode("favorites")}
            >
              Favorites ({favorites.length})
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="error">
            <AlertCircle size={16} />
            {error}
          </Alert>
        )}

        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            {viewMode === "all" && hasSearched && (
              <MovieList
                movies={displayMovies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                title={searchQuery ? `Search Results for "${searchQuery}"` : "Search Results"}
              />
            )}

            {viewMode === "favorites" && (
              <MovieList
                movies={displayMovies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                title="My Favorites"
              />
            )}

            {viewMode === "all" && !hasSearched && !loading && (
              <Card className="welcome-card">
                <Search size={64} />
                <h3>Start Your Movie Search</h3>
                <p>Enter a movie title above to discover and add movies to your favorites</p>
              </Card>
            )}
          </>
        )}

        <Card className="instructions">
          <h3>How to Use</h3>
          <ul>
            <li>
              <strong>Search:</strong> Enter a movie title and click search
            </li>
            <li>
              <strong>Add to Favorites:</strong> Click the heart icon on any movie
            </li>
            <li>
              <strong>View Favorites:</strong> Switch to the Favorites tab to see your saved movies
            </li>
            <li>
              <strong>Persistent Storage:</strong> Your favorites are saved locally and will persist between sessions
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default App
