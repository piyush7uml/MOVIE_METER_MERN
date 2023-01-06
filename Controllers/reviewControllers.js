import asyncHandler from 'express-async-handler';
import Movie from '../Models/movieModel.js';
import Review from '../Models/reviewModel.js';



/******************************************************
 * @CREATE_REVIEW
 * @PRIVATE
 * @REQUEST_TYPE POST
 * @route "/api/review/create/:movieId"
 * @description Create Review Controller for Movie
 * @parameters rating, reviewText, movieName, movieId from params
 * @returns Review Object
 ******************************************************/



export const createReview = asyncHandler(async (req, res) => {

    const { rating, reviewText, movieName } = req.body;

    const movieId = req.params.movieId;
    const userId = req.user._id;


    const reviewExist = await Review.findOne({
        userId,
        movieId
    })

    if (reviewExist) {
        res.status(401);
        throw new Error(`You have already reviewed the movie`)
    }

    const review = await Review.create({
        movieName, userId, movieId, reviewText, rating
    })

    if (review) {
        const movie = await Movie.findById(movieId);

        if (movie) {
            movie.numberOfReviews = movie.numberOfReviews + 1;
            movie.sumOfRatings = movie.sumOfRatings + Number(rating);

            await movie.save();

            res.status(201);

            res.json(review)

        } else {
            res.status(500);
            throw new Error(`Movie could not update after Review Creation`)
        }
    } else {
        res.status(500);
        throw new Error(`Review Creation Failed`)
    }



})






/******************************************************
 * @UPDATE_REVIEW
 * @PRIVATE
 * @REQUEST_TYPE PUT
 * @route "/api/review/update/:reviewId"
 * @description Update Review Controller for Movie
 * @parameters rating, reviewText, reviewId from params
 * @returns Updated Review Object
 ******************************************************/


export const updateReview = asyncHandler(async (req, res) => {

    const { rating, reviewText } = req.body;

    const reviewId = req.params.reviewId
    const userId = req.user._id;



    const review = await Review.findById(reviewId)


    if (review) {

        const oldRating = review.rating

        review.rating = Number(rating) || review.rating;
        review.reviewText = reviewText || review.reviewText;

        const updatedReview = await review.save();


        const movie = await Movie.findById(review.movieId);

        if (movie) {

            movie.sumOfRatings = movie.sumOfRatings - oldRating + Number(rating);

            await movie.save();

            res.status(200);

            res.json(updatedReview)

        } else {
            res.status(500);
            throw new Error(`Movie could not update for review updation`)
        }
    } else {
        res.status(500);
        throw new Error(`Review not found for updation`)
    }

})





/******************************************************
 * @DELETE_REVIEW
 * @PRIVATE
 * @REQUEST_TYPE DELETE
 * @route "/api/review/delete/:reviewId"
 * @description Delete Review Controller for Movie
 * @parameters reviewId from params
 * @returns Deleted Review Object
 ******************************************************/


export const deleteReview = asyncHandler(async (req, res) => {

    const reviewId = req.params.reviewId;

    const review = await Review.findByIdAndDelete(reviewId)

    if (review) {

        const movie = await Movie.findById(review.movieId);

        movie.numberOfReviews = movie.numberOfReviews - 1;
        movie.sumOfRatings = movie.sumOfRatings - review.rating;
        await movie.save();

        res.status(200);
        res.json(review)

    } else {
        res.status(500);
        throw new Error(`Review Could not delete`)
    }
})






/******************************************************
 * @GET_REVIEWS_BY_MOVIE
 * @PUBLIC
 * @REQUEST_TYPE GET
 * @route "/api/review/getByMovie/:movieId/get"
 * @description Get Reviews by Movie Controller
 * @parameters movieId from params, Category & Page Number from Query
 * @returns Array of Reviews 
 ******************************************************/

export const getReviewsByMovie = asyncHandler(async (req, res) => {

    const movieId = req.params.movieId;
    const page = req.query.page;
    const numReviews = 5;
    const cat = req.query.cat

    let reviews

    if (cat == 'Recent') {

        reviews = await Review.find({ movieId })
            .skip((page - 1) * numReviews).limit(numReviews)
            .populate('userId', ' _id firstname lastname')
            .populate('movieId', '_id sumOfRatings numberOfReviews')
            .sort({ updatedAt: -1 })

    }

    if (cat == 'Top rated') {

        reviews = await Review.find({ movieId }).skip((page - 1) * numReviews).limit(numReviews).populate('userId', ' _id firstname lastname').populate('movieId', '_id sumOfRatings numberOfReviews')
            .sort({ rating: -1 })

    }

    if (cat == 'Low rated') {

        reviews = await Review.find({ movieId }).skip((page - 1) * numReviews).limit(numReviews).populate('userId', ' _id firstname lastname').populate('movieId', '_id sumOfRatings numberOfReviews')
            .sort({ rating: 1 })

    }



    if (reviews) {


        const updatedReviews = reviews.map((review, i) => {

            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const formatedDate = review.updatedAt.toLocaleDateString('en-US', options);

            return {
                _id: review._id,
                userId: review.userId,
                movieId: review.movieId,
                reviewText: review.reviewText,
                rating: review.rating,
                createdAt: review.createdAt,
                updatedAt: formatedDate
            }
        })
        res.status(200);
        res.json(updatedReviews)

    } else {
        res.status(500);
        throw new Error(`Error in getting reviews`)
    }
})




/******************************************************
 * @GET_REVIEW_BY_ID
 * @PRIVATE
 * @REQUEST_TYPE GET
 * @route "/api/review/get/:reviewId"
 * @description Get Review by ID Controller
 * @parameters Review ID from params
 * @returns Review Object 
 ******************************************************/


export const getReviewById = asyncHandler(async (req, res) => {

    const reviewId = req.params.reviewId;

    const review = await Review.findById(reviewId).populate('movieId', 'name');

    if (review) {
        res.status(200);
        res.json(review)
    } else {
        res.status(500);
        throw new Error(`Error in getting Review`)
    }

})


/******************************************************
 * @GET_REVIEWS_BY_USER
 * @PRIVATE
 * @REQUEST_TYPE GET
 * @route "/api/review/getByUser"
 * @description Get Reviews by User Controller
 * @parameters Search String & Page Number from Query, Category from Query
 * @returns Array of Reviews
 ******************************************************/


export const getReviewsByUser = asyncHandler(async (req, res) => {

    const page = req.query.page;
    const numReviews = 5;
    const searchResult = req.query.searchResult



    const reviews = await Review.find({
        userId: req.user._id,
        movieName: { $regex: searchResult, $options: 'i' }
    })
        .skip((page - 1) * numReviews).limit(numReviews)
        .populate('userId', ' _id firstname lastname')
        .populate('movieId', '_id sumOfRatings numberOfReviews')
        .sort({ updatedAt: -1 })


    if (reviews) {


        const updatedReviews = reviews.map((review, i) => {

            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const formatedDate = review.updatedAt.toLocaleDateString('en-US', options);

            return {
                _id: review._id,
                movieName: review.movieName,
                userId: review.userId,
                movieId: review.movieId,
                reviewText: review.reviewText,
                rating: review.rating,
                createdAt: review.createdAt,
                updatedAt: formatedDate
            }
        })
        res.status(200);
        res.json(updatedReviews)

    } else {
        res.status(500);
        throw new Error(`Error in getting reviews for user`)
    }

})