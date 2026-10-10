
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://localhost:8000";

//1. the general api
export async function getRecentMovie() {
    //  console.log(API_KEY)
     const result = await fetch(`https://www.omdbapi.com/?s=Marvel&page=1&apikey=${API_KEY}`) 
     const data = await result.json()
     return data
}

//to get the details about particular movies 
export async function getParticularMovie(imdbID) {
    const result = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
    const data = await result.json()
    return data
}

//search bar
export async function searchMovies(query, setLoading, setMovies) {
    console.log('hii')
    try {
        const result = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`)
        const data = await result.json()
        if (data.Response == "True") {
            setMovies(data.Search)
        } else {
            setMovies([])
        }
    } catch (err) {
        console.error("Error fetching search results:", err);
    } finally {
        setLoading(false)
    }
   
}

//-------the server side request will be below

export async function addWatchlist(imdbID , Poster, Title , Year , setCheckWatchlist) {
    try {
        // watchlistAdd
        const response = await fetch(`${BASE_URL}/watchlistAdd`, {
            method: "POST",
            headers: {//That line tells the server what kind of data you are sending in the body of your request.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imdbID,
        Title,
        Poster,
        Year,
      }),
        })
        const data = await response.json()
        
        if (!response.ok) {//fetch throws error if there is an network issue but if there is something more like 409 it will still consider as a successful message so this extra check has been kept
      throw new Error(data.message || "Failed to add movie");
    }
        console.log(data)
        setCheckWatchlist(true)
        return data

    } catch (err) {
    console.error("Error adding to watchlist" , err.message)
    }
}

//the below function is a request to the server checking if the movie is already in the db
export async function checkMovie(imdbID , setCheckWatchlist) {
    try {
        const result = await fetch(`${BASE_URL}/checkMovie/${imdbID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await result.json()
        setCheckWatchlist(data.exists)
        return data.exists

    } catch (err) {
        console.error("failed to check to the movie whether its added in the watchlist or not ",err)
    }
}

//below is the function to remove the movie from the watchlist
export async function removeMovie(imdbID ,setCheckWatchlist) {
    try {
        const result = await fetch(`${BASE_URL}/removeMovie/${imdbID}`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
            }
        })
        const data = await result.json()
        console.log(data)
        setCheckWatchlist(false)
        return data.sucess

    } catch (err) {
        console.log("failed to remove the movie from the watchlist",err)
    }
}
//below function is used to get the movies from the watchlist
export async function getWatchlistMovies() {
    try {
        const result = await fetch(`${BASE_URL}/getWatchlistMovies`, {
            method: "GET",
            headers: {
                 'Content-Type': 'application/json',
            }
          
            
        })
           if (!result.ok) {
        throw new Error(`Server returned status: ${result.status}`);
    }
          const data = await result.json()
        // console.log(data)
        return data 
    } catch (err) {
        console.log("not able to get the movies from the watchlist",err)
    }
}
