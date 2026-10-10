import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getRecentMovie , getWatchlistMovies } from "../services/movieApi";
// Master list of all available movies for the app
// const allMovies = [
//   { id: 1, title: "Spider-Man: Brand New Day", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop" },
//   { id: 2, title: "Resident Evil", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop" },
//   { id: 3, title: "The Odyssey", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop" },
//   { id: 4, title: "Insidious: Out of the Further", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" },
//   { id: 5, title: "The Fix", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop" },
//   { id: 6, title: "Runner", genre: "Movie", year: "2026", posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop" },
//   { id: 7, title: "Interstellar Odyssey", genre: "Sci-Fi", year: "2025", posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" },
//   { id: 8, title: "Deep Nebula", genre: "Documentary", year: "2026", posterUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop" },
// ];

export default function Movies() {
  const navigate = useNavigate()
   const [movies , setMovies] = useState([])
    const [activeTab, setActiveTab] = useState('explore'); // 'explore' or 'watchlist'
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function gettingData() {
      const data = await getRecentMovie()
      setMovies(data.Search)
      const watchlistMovies = await getWatchlistMovies()
      setWatchlist(watchlistMovies)
    }
    gettingData()
    },[])


  // Determine what movies to show based solely on the activeTab
  const displayedMovies = activeTab === 'explore' ? movies : watchlist;



  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden pb-20">
   
      {/* Main Switcher: Explore Space vs Watchlist */}
      <div className="w-full max-w-[1280px] mx-auto px-6 mt-10 mb-8">
        <div className="flex items-center justify-center gap-8 border-b border-gray-800 pb-4">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`text-lg font-semibold transition ${activeTab === 'explore' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Explore Space
          </button>
          <button 
            onClick={() => setActiveTab('watchlist')}
            className={`text-lg font-semibold transition ${activeTab === 'watchlist' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            {/* My Watchlist ({watchlist.length}) */}
            watchlist
          </button>
        </div>
      </div>

      {/* Dynamic Movie Grid */}
      <div className="w-full max-w-[1280px] mx-auto px-6">
        {displayedMovies.length === 0 ? (
          activeTab === 'watchlist' ? <><div className="text-center py-24 text-gray-500">
            <p className="text-xl">Your watchlist is currently empty.</p>
            <p className="text-sm mt-2 text-gray-600">Explore movies and click "+ Watch Later" to save them here.</p>
          </div></> : <div className="text-center py-24 text-gray-500">
            <p className="text-xl">loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {displayedMovies.map((movie) => {
              // const isSaved = watchlist.some((m) => m.id === movie.id);
              return (
  <div 
    key={movie.imdbID} 
    onClick={() => navigate(`/movie/${movie.imdbID}`)}
    className="cursor-pointer group flex flex-col"
  >
    {/* Poster Card */}
    <div className="relative h-[270px] sm:h-[300px] rounded-xl overflow-hidden bg-gray-900 border border-gray-800/80 shadow-xl transition duration-300 group-hover:scale-105 group-hover:border-indigo-500/50">
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster+Available"} 
        alt={movie.Title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />
      
      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition"></div>

      {/* Action / Details Badge - Always visible on mobile, shows on hover on desktop */}
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
  <span className="bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold py-2 px-4 rounded-lg backdrop-blur-md shadow-md sm:opacity-0 sm:group-hover:opacity-100 transition transform sm:translate-y-2 sm:group-hover:translate-y-0">
    Details →
  </span>
</div>
    </div>

    {/* Movie Info */}
    <div className="mt-2.5 flex items-start justify-between">
      <div>
        <h3 className="text-white font-medium text-sm truncate w-[130px] sm:w-[150px]">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-xs mt-0.5">
          {movie.Type} • {movie.Year}
        </p>
      </div>
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevents card click when clicking the options dots
          // Add your options handler here
        }}
        className="text-gray-400 hover:text-white text-lg px-1"
      >
        •••
      </button>
    </div>
  </div>
);
            })}
          </div>
        )}
      </div>
    </div>
  );
}