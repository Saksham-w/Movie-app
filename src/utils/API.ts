import type { Movie } from "../types/movie"

const API_KEY = "16220f02"
const API_URL = "https://www.omdbapi.com/"

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`)

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    if (data.Response === "True" && data.Search) {
      return data.Search
    } else {
      throw new Error(data.Error || "No movies found")
    }
  } catch (error) {
    throw new Error("Failed to fetch movies. Please check your internet connection and try again.")
  }
}
