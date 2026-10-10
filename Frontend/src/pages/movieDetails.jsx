import { useParams , useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { getParticularMovie , addWatchlist , checkMovie , removeMovie} from "../services/movieApi";

// const allMovies = [
//   { id: 1, title: "Spider-Man: Brand New Day", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop", description:"lorem20 Below is the complete code implementing the hardcoded lookup and styling the layout to match your reference screenshot with a full-width immersive backdrop, action buttons, metadata side panel, and synopsis lorem20 Below is the complete code implementing the hardcoded lookup and styling the layout to match your reference screenshot with a full-width immersive backdrop, action buttons, metadata side panel, and synopsi"  },
//   { id: 2, title: "Resident Evil", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop" },
//   { id: 3, title: "The Odyssey", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop" },
//   { id: 4, title: "Insidious: Out of the Further", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" },
//   { id: 5, title: "The Fix", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop" },
//   { id: 6, title: "Runner", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop" },
//   { id: 7, title: "Interstellar Odyssey", genre: "Sci-Fi", year: "2025", posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" },
//   { id: 8, title: "Deep Nebula", genre: "Documentary", year: "2026", posterUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop" },
// ];

export default function MovieDetails() {
  const { imdbID } = useParams()
  const navigate = useNavigate()
  // console.log(imdbID)
  //state to store the movies details
  const [details, setDetails] = useState(null)
  const [checkWatchlist , setCheckWatchlist] = useState(null)
    // const navigate = useNavigate()
  useEffect(() => {
    async function getData() {
      const data = await getParticularMovie(imdbID)
      // console.log(data)
      setDetails(data)
      //the below this is used to check whether the movie is added to the playlist or not
      const check = await checkMovie(imdbID , setCheckWatchlist)
      setCheckWatchlist(check)
    }
    getData()
     },[checkWatchlist])
 
 if (!details) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading movie details...</p>
      </div>
    );
  }

  return (
  <div className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden">
    
    {/* 1. Atmospheric Ambient Background (Fixes the blurry poster issue) */}
    <div className="absolute inset-0 h-[60vh] overflow-hidden pointer-events-none opacity-30">
      <img 
        src={details.Poster} 
        alt="" 
        className="w-full h-full object-cover filter blur-3xl scale-125"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/80 to-[#030712]"></div>
    </div>

    {/* Back Button Header */}
    <div className="relative z-30 max-w-7xl mx-auto px-6 pt-6">
      <button 
        onClick={() => navigate(-1)} 
        className="bg-gray-900/80 hover:bg-gray-800 text-white px-4 py-2 rounded-lg backdrop-blur-md transition text-sm font-medium border border-gray-700/50 flex items-center gap-2 shadow-lg"
      >
        <span>←</span> Back
      </button>
    </div>

    {/* Main Hero & Details Container */}
    <div className="relative max-w-7xl mx-auto px-6 py-10 lg:py-16 z-20">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Crisp Vertical Poster Card with Glow */}
        <div className="w-full sm:w-[320px] shrink-0 mx-auto lg:mx-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group">
            <img 
              src={details.Poster} 
              alt={details.Title} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </div>
            {
              checkWatchlist == false ? <> {/* Quick Action Button under poster */}
            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            onClick={() => addWatchlist(details.imdbID , details.Poster , details.Title , details.Year , setCheckWatchlist)}
            >
            <span>+</span> Watch Later
          </button></> :<> {/* Quick Action Button under poster */}
            <button className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-medium transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            onClick={() => removeMovie(details.imdbID , setCheckWatchlist)}
            >
            <span>-</span> Remove from watchlist
          </button></>
             }
         
        </div>

        {/* Right Info Section */}
        <div className="flex-1 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
              {details.Type}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
              {details.Title}
            </h1>
            
            {/* Cleaned Genre String */}
            <p className="text-gray-400 text-sm md:text-base font-medium">
              {details.Genre}
            </p>
          </div>

          {/* Rating & Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="border border-gray-700 px-2.5 py-1 rounded-md text-xs bg-gray-900/60 font-medium">
              {details.Rated || "PG-13"}
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
              ⭐ {details.imdbRating || "8.0"}
            </span>
            <span className="text-gray-300 font-medium bg-gray-900/60 px-3 py-1 rounded-md border border-gray-700">
              {details.Year}
            </span>
            <span className="text-gray-300 font-medium bg-gray-900/60 px-3 py-1 rounded-md border border-gray-700">
              {details.Runtime}
            </span>
          </div>

          {/* Synopsis Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Overview</h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
              {details.Plot}
            </p>
          </div>

          {/* Grid Metadata Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800/80">
            <div className="bg-gray-900/50 border border-gray-800/60 p-4 rounded-xl backdrop-blur-sm">
              <span className="text-gray-400 text-xs block mb-1">Language</span>
              <span className="text-white font-semibold text-sm">{details.Language}</span>
            </div>
            <div className="bg-gray-900/50 border border-gray-800/60 p-4 rounded-xl backdrop-blur-sm">
              <span className="text-gray-400 text-xs block mb-1">Director</span>
              <span className="text-white font-semibold text-sm truncate block">{details.Director || "N/A"}</span>
            </div>
            <div className="bg-gray-900/50 border border-gray-800/60 p-4 rounded-xl backdrop-blur-sm">
              <span className="text-gray-400 text-xs block mb-1">Released</span>
              <span className="text-white font-semibold text-sm">{details.Released || details.Year}</span>
            </div>
          
            <div className="bg-gray-900/50 border border-gray-800/60 p-4 rounded-xl backdrop-blur-sm">
              <span className="text-gray-400 text-xs block mb-1">imdb Rating</span>
                <span className="text-white font-semibold text-sm truncate block">{ details.imdbRating}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
);
}


