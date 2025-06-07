import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { Search, Loader2, Film } from "lucide-react"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Card from "./ui/Card"

const SearchBar = ({ 
  onSearch, 
  loading 
}: { 
  onSearch: (query: string) => void
  loading: boolean 
}) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <Card className="search-card">
      <div className="card-header">
        <h2>
          <Film size={20} />
          Movie Search
        </h2>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-wrapper">
            <Search className="search-icon" size={16} />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !query.trim()}>
            {loading ? <Loader2 size={16} className="spinning" /> : "Search"}
          </Button>
        </form>
      </div>
    </Card>
  )
}

export default SearchBar
