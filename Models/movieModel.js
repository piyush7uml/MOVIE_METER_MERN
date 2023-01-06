import mongoose from 'mongoose';



const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Movie name is mandatory']
    },
    description: {
        type: String,
        required: [true, 'Description is mandatory']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Release date is mandatory']
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }

    },
    category: {
        type: String,
        enum: ['Action', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Science-Fiction', 'Thriller'],
        required: [true, 'Category is mandatory']
    },
    sumOfRatings: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    runTime: {
        type: String,
        required: [true, 'Run time is mandatory']
    },
    director: {
        type: String,
        required: [true, 'Director is mandatory']
    },

    writer: {
        type: String,
        required: [true, 'Writer is mandatory']
    },

    producer: {
        type: String,
        required: [true, 'Producer is mandatory']
    },
    starcast: {
        type: String,
        required: [true, 'Starcast is mandatory']
    },
    certificate: {
        type: String,
        required: [true, 'Certificate is mandatory']
    }

}, { timestamps: true })



const Movie = mongoose.model("Movie", movieSchema)

export default Movie;