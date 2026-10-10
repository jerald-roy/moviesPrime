import express from "express"
import cors from 'cors'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://movies-prime.vercel.app'
  ],
  credentials: true
}));

// 2. Parse incoming JSON payloads (this is what you need!)
app.use(express.json({ limit: '16kb' }))


//routers import
import { addMovies } from "./controllers/addWatchlist.js"
import { checkMovie } from "./controllers/checkMovie.js";
import { removeMovie } from "./controllers/removeMovie.js";
import { getWatchlistMovies } from "./controllers/getWatchlistMovies.js";
//routes declaration
app.get("/", (req, res) => {
    res.status(200).json({message:"movie backend is up and running!"})
})

app.post("/watchlistAdd", addMovies)
app.get("/checkMovie/:imdbID", checkMovie)
app.post("/removeMovie/:imdbID", removeMovie)
app.get("/getWatchlistMovies",getWatchlistMovies)


export {app}