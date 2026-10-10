import mongoose from "mongoose"

const watchlistSchema = new mongoose.Schema(
    {
        imdbID: {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        Title: {
            type: String,
            required:true
        },
        Poster: {
            type:String
        },
        Year: {
            type: String,
            required:true
        }
    }
)

export const Watchlist = mongoose.model("Watchlist",watchlistSchema)//the first val is used for collection/table creation