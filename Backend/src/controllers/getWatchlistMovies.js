import { Watchlist } from "../models/watchlist.model.js";

export async function getWatchlistMovies(req, res) {
    try {
        const watchlistMovies = await Watchlist.find({})
        // console.log(watchlistMovies.length)
        return res.status(200).json(watchlistMovies);
    } catch (err) {
        return res.status(400).json({
            message:err.message
        })
    }
}