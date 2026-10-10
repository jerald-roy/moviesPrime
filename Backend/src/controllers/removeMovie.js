import { Watchlist } from "../models/watchlist.model.js";

export async function removeMovie(req,res) {
    try {
        const { imdbID } = req.params
        if (!imdbID) {
            return res.status(400).json({message:"need id of the movie to remove the movie from the playlist"})
        }
        const movie = await Watchlist.findOneAndDelete({ imdbID: imdbID })
        if (!movie) {
            return res.status(404).json({message:"movie not found in the wathclist"})
        }

        return res.status(200).json({
            sucess: "true",
            message: "movie got successfully removed from the playlist",
            data:movie
        })

    } catch (err) {
        return res.status(500).json({message:err.message})
    }
}