import mongoose from 'mongoose';




const reviewSchema = new mongoose.Schema({

    movieName: {
        type: String,
        required: [true, 'Movie Name is mandatory']
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `User Id is mandatory`]
    },

    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, `Movie Id is mandatory`]
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is mandatory ']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is mandatory']
    }

}, { timestamps: true })


const Review = mongoose.model('Review', reviewSchema);

export default Review