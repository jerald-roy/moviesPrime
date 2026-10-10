import { Watchlist } from "../models/watchlist.model.js";

async function addMovies(req, res) {
    try {
        const { imdbID, Title, Poster, Year } = req.body
        
        //validation
        if (!imdbID || !Title) {
            return res.status(400).json({
                sucess: false,
                message:"imdbID and title are required fields."
            })

        }

        //check if the movie is already in the watchlist
        const existingMovie = await Watchlist.findOne({ imdbID })
        if (existingMovie) {
            return res.status(409).json({
                sucess: false,
                message:"Movie is already in your watchlist"
            })
        }

        //create and save the new entry into MongoDB
        const newMovie = await Watchlist.create({
            imdbID,
            Title,
            Poster,
            Year,
        })

        //send a sucessfull response
        return res.status(200).json({
            sucess: true,
            message: "Movie added to watchlist successfully!",
            data:newMovie
        })
    } catch (err) {
        console.log("Error adding movies to the watchlist : ", err)
        return res.status(500).json({
            sucess: false,
            message:"Internal server error while adding the movie"
        })
    }
}

export {addMovies}