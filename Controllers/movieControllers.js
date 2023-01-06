import asyncHandler from 'express-async-handler';
import Movie from '../Models/movieModel.js';
import cloudinary from '../configs/cloudinary.js'
import Review from '../Models/reviewModel.js';
import User from '../Models/userModel.js'





/******************************************************
 * @CREATE_MOVIE
 * @PRIVATE
 * @REQUEST_TYPE POST
 * @route "/api/movie/create"
 * @description Controller to Create Movie
 * @parameters name, description, releaseDate, runTime, image,
               director, writer, producer,
               starcast, certificate, category

 * @returns Created Movie Object
 ******************************************************/


export const createMovie = asyncHandler(async (req, res) => {

    const { name, description, releaseDate, runTime, image,
        director, writer, producer,
        starcast, certificate, category } = req.body

    const imageLink = await cloudinary.uploader.upload(image, {
        folder: 'Movie'
    });


    const movie = await Movie.create({
        name, description, releaseDate, runTime,
        image: {
            public_id: imageLink.public_id,
            secure_url: imageLink.secure_url
        },
        director, writer, producer,
        starcast, certificate, category
    })

    if (!movie) {
        res.status(401);
        throw new Error(`Error in creating movie`)
    }


    res.status(201);
    res.json(movie)

})





/******************************************************
 * @UPDATE_MOVIE
 * @PRIVATE
 * @REQUEST_TYPE PUT
 * @route "/api/movie/update/:id"
 * @description Controller to Update Movie
 * @parameters name, description, releaseDate, runTime, image,
               director, writer, producer,
               starcast, certificate, category,
               Movie id from params

 * @returns Updated Movie Object
 ******************************************************/


export const updateMovie = asyncHandler(async (req, res) => {

    const movieId = req.params.id

    const { image } = req.body;

    let imageUploaded;

    if (image && !image.public_id) {

        const imageFromCloudinary = await cloudinary.uploader.upload(image, {
            folder: 'Movie'
        });

        imageUploaded = {
            public_id: imageFromCloudinary.public_id,
            secure_url: imageFromCloudinary.secure_url
        }

        const movie = await Movie.findById(movieId);

        await cloudinary.v2.uploader.destroy(movie.image.public_id)

    } else {

        imageUploaded = image
    }

    const movie = await Movie.findByIdAndUpdate(movieId, { ...req.body, image: imageUploaded }, { new: true, runValidators: true })

    if (!movie) {
        res.status(401);
        throw new Error(`Movie could not update`)
    }

    res.status(200);
    res.json(movie);

})





/******************************************************
 * @DELETE_MOVIE
 * @PRIVATE
 * @REQUEST_TYPE DELETE
 * @route "/api/movie/delete/:id"
 * @description Controller to Delete Movie
 * @parameters Movie id from params
 * @returns Deleted Movie Object
 ******************************************************/

export const deleteMovie = asyncHandler(async (req, res) => {

    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
        res.status(401);
        throw new Error(`Movie could not delete`)
    }

    await cloudinary.v2.uploader.destroy(movie.image.public_id);

    await Review.deleteMany({ movieId: req.params.id })

    await User.updateMany({}, { $pull: { watched: req.params.id } })

    res.status(200);
    res.json({ success: true });
})




/******************************************************
 * @GET_MOVIE
 * @PUBLIC
 * @REQUEST_TYPE GET
 * @route "/api/movie/get/:id"
 * @description Controller to Get Single Movie By Movie Id
 * @parameters Movie id from params
 * @returns  Movie Object
 ******************************************************/

export const getMovie = asyncHandler(async (req, res) => {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(401);
        throw new Error(`Movie could not get`)
    }


    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = movie.releaseDate.toLocaleDateString('en-US', options);


    res.status(200);
    res.json({
        _id: movie._id,
        name: movie.name,
        description: movie.description,
        releaseDate: formattedDate,
        category: movie.category,
        sumOfRatings: movie.sumOfRatings,
        numberOfReviews: movie.numberOfReviews,
        image: movie.image,
        runTime: movie.runTime,
        director: movie.director,
        writer: movie.writer,
        producer: movie.producer,
        starcast: movie.starcast,
        certificate: movie.certificate
    });

})






/******************************************************
 * @GET_All_MOVIES
 * @PUBLIC
 * @REQUEST_TYPE GET
 * @route "/api/movie/getAll"
 * @description Controller to Get All Movies 
 * @parameters Search String, Page Number, Category String All from Query
 * @returns  Array of Movies
 ******************************************************/

export const getAllMovie = asyncHandler(async (req, res) => {

    const searchResult = req.query.q
    const pageNumber = req.query.page
    const cat = req.query.cat

    const itemNum = 9;

    let movies

    if (cat) {
        movies = await Movie.find({
            name: { $regex: searchResult, $options: "i" },
            category: cat
        }).skip((pageNumber - 1) * itemNum).limit(itemNum)
            .sort({ createdAt: -1 })

    } else {
        movies = await Movie.find({
            name: { $regex: searchResult, $options: "i" }
        }).skip((pageNumber - 1) * itemNum).limit(itemNum)
            .sort({ createdAt: -1 })
    }



    if (!movies) {
        res.status(401);
        throw new Error(`Movie could not get`)
    }

    res.status(200);
    res.json(movies);

})


