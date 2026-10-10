import image from "../assets/gal.jpg"
import { useEffect, useState } from "react"
import { searchMovies } from "../services/movieApi"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const [query, setQuery] = useState('') //used to store the search query
  const [movies, setMovies] = useState([]) //used to store the movies coming from the dropdown
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => { 
    //dont search if query is too short
    if (query.trim().length < 2) {
      return 
    }

     function fetchMovies() {
        searchMovies(query , setLoading , setMovies)
    
    }
      
    const timer = setTimeout(fetchMovies, 400)
    return ()=>{clearTimeout(timer)}

  }, [query]) // this runs the intial mount as well as during the when props get changed
  
 return <>
   <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Full-width Galaxy Background Image */}
      <img 
        src={image} 
        alt="Galaxy Space" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay: fades from transparent at top to solid dark body color at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#030712]/60 to-[#030712] z-10"></div>

      {/* Content Layer (Centered, max-width 1280px) */}
      <div className="relative z-20 w-full h-full max-w-[1280px] mx-auto flex flex-col items-center justify-center px-6 text-center">
        
        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-white">
          Explore Your Cinematic Universe
        </h1>

        {/* Search Bar & Dropdown Wrapper */}
<div className="w-full max-w-xl flex flex-col gap-2 relative mb-6">
  
  {/* Input Container */}
  <div className="relative w-full">
    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
      🔍
    </span>
    <input 
      type="text" 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="type the movie name?" 
      className="w-full bg-gray-900/80 border border-gray-700/65 rounded-full py-3.5 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-lg backdrop-blur-md"
    />
  </div>

  {/* Dropdown Results (Now flows naturally underneath using Flexbox) */}
  {query.trim().length >= 2 && (movies.length > 0 || loading) && (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50 divide-y divide-gray-800 text-left">
      {loading && (
        <div className="p-4 text-center text-sm text-gray-400">Searching...</div>
      )}
      {!loading && movies.map((movie) => (
        <button
          key={movie.imdbID}
          onClick={() => {
            setMovies([]); 
            setQuery('');
           navigate(`/movie/${movie.imdbID}`)
          }}
          className="flex items-center gap-3 p-3 hover:bg-gray-800/80 cursor-pointer transition"
        >
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40x60?text=N/A"} 
            alt={movie.Title} 
            className="w-10 h-14 object-cover rounded-md"
          />
          <div className="overflow-hidden">
            <h4 className="text-white text-sm font-medium truncate">{movie.Title}</h4>
            <p className="text-gray-400 text-xs">
              {movie.Year} • <span className="uppercase">{movie.Type}</span>
            </p>
          </div>
        </button>
      ))}
    </div>
  )}

</div>
     



        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300">
    Search through a galaxy of films, discover hidden gems, and curate your personal watchlist for later.
        </div>

      </div>
    </div>
    </>  
}