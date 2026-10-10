import { Watchlist } from "../models/watchlist.model.js"


export async function checkMovie(req,res) {
    try {
        const { imdbID } = req.params
        if (!imdbID) {
            return res.status(400).json({message:"need an id to find the movie"})
        }
        const movie = await Watchlist.findOne({ imdbID: imdbID })
        if (movie) {
            return res.status(200).json({
                exists: true,
                message: "movie exists on the watchlist",
                data:movie
            })
        }
        return res.status(200).json({
            exists: false,
            message: "movie not on the watchlist",
            
        })
    } catch (err) {
        return res.status(500).json({message:err.message})
    }
   
    
}