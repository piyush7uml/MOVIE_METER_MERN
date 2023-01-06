import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';



/******************************************************
 * @REGISTER_USER
 * @PUBLIC
 * @REQUEST_TYPE POST
 * @route "/api/user/register"
 * @description User Register Controller for creating new user
 * @parameters firstname,lastname, email, password
 * @returns User Object with Token
 ******************************************************/


export const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        res.status(401);
        throw new Error(`All Fields are mandatory`)
    }

    const emailExist = await User.findOne({ email })


    if (emailExist) {
        res.status(401);
        throw new Error(`Email Already exist...try another`)
    }

    const user = await User.create({
        firstname, lastname, email, password
    })

    if (user) {
        const token = user.genJwt(user._id)

        user.password = undefined

        res.status(201);
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            watched: user.watched,
            token
        })
    } else {
        res.status(500);
        throw new Error(`Error in User Registration`)
    }
})







/******************************************************
 * @LOGIN_USER
 * @PUBLIC
 * @REQUEST_TYPE POST
 * @route "/api/user/login"
 * @description User Login Controller for verifying user
 * @parameters email, password
 * @returns User Object with Token
 ******************************************************/


export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401);
        throw new Error(`Email & Password both are mandatory`)
    }

    const user = await User.findOne({ email })


    if (user) {

        if (await user.comparePassword(password)) {

            const token = user.genJwt(user._id)

            user.password = undefined

            res.status(201);
            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isAdmin: user.isAdmin,
                watched: user.watched,
                token
            })
        } else {

            res.status(401);
            throw new Error(`Login Failed...email and password do not match`)

        }

    } else {
        res.status(401);
        throw new Error(`Login Failed...check email and password`)
    }

})







/******************************************************
 * @SET_WATCHEDLIST
 * @PRIVATE
 * @REQUEST_TYPE GET
 * @route "/api/user/watchlist/:movieId/set"
 * @description Add or Remove movie from Watched List
 * @parameters Query for add or remove, MovieId from params
 * @returns User Object with Token
 ******************************************************/



export const setWatchedList = asyncHandler(async (req, res) => {

    const q = req.query.q;

    const movieId = req.params.movieId;


    const getUser = await User.findById(req.user._id)


    if (getUser) {

        if (q == 'add') {
            getUser.watched.push(movieId);
        }

        if (q == 'remove') {
            getUser.watched.pull(movieId);
        }



        const user = await getUser.save();


        if (user) {

            const token = user.genJwt(user._id)

            user.password = undefined

            res.status(200);
            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isAdmin: user.isAdmin,
                watched: user.watched,
                token
            })

        } else {
            res.status(500);
            throw new Error('User watched list could not upadate')
        }



    } else {
        res.status(401);
        throw new Error('User not found to upadate watched List')
    }


})







/******************************************************
 * @DELETE_USER
 * @PRIVATE
 * @REQUEST_TYPE DELETE
 * @route "/api/user/delete/:id"
 * @description Delete User from DB
 * @parameters userId from params
 * @returns Deleted User Object
 ******************************************************/



export const deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id

    const user = await User.findByIdAndDelete(id);

    if (user) {
        res.status(200);
        res.json(user)
    } else {
        res.status(500);
        throw new Error(`Error in deleting User`)
    }

})






/******************************************************
 * @GET_WATCHEDLIST
 * @PRIVATE
 * @REQUEST_TYPE GET
 * @route "/api/user/getWatchedList"
 * @description Get Watched List for User
 * @parameters Page Number from query, Search String from query
 * @returns Watched array from User Object
 ******************************************************/


export const getWatchedList = asyncHandler(async (req, res) => {

    const searchResult = req.query.searchResult
    const page = req.query.page;
    const numItems = 10;

    const skip = (page - 1) * numItems;
    const limit = numItems;




    const watchedList = await User.findOne({ _id: req.user._id })
        .populate({
            path: 'watched',
            select: '_id name director starcast',
            match: { name: { $regex: searchResult, $options: "i" } },
            options: {
                skip: skip,
                limit: limit
            }

        })


    if (watchedList) {
        res.status(200);
        res.json(watchedList.watched)
    } else {
        res.status(401)
        throw new Error("Error in watched list")
    }

})









/******************************************************
 * @GET_ALL_USERS
 * @PRIVATE
 * @REQUEST_TYPE GET
 * @route "/api/user/getUsers"
 * @description Get All Users for Admin
 * @parameters Search String from Query, Page Number from Query
 * @returns Array of Users
 ******************************************************/


export const getAllUsers = asyncHandler(async (req, res) => {

    const searchResult = req.query.searchResult;
    const page = req.query.page;
    const numItems = 10

    const users = await User.find({
        firstname: { $regex: searchResult, $options: 'i' }
    }).select('_id firstname lastname email')
        .skip((page - 1) * numItems).limit(numItems)


    if (users) {
        res.status(200);
        res.json(users)
    } else {
        res.status(500);
        throw new Error(`Error in getting users for admin`)
    }
})




/******************************************************
 * @UPDATE_USER
 * @PRIVATE
 * @REQUEST_TYPE PUT
 * @route "/api/user/update"
 * @description Update User
 * @parameters firstname, lastname, email, password
 * @returns Updated User with Token
 ******************************************************/



export const updateUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    const emailExist = await User.findOne({ email })


    if (emailExist) {

        if (emailExist._id.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error(`Email already exist...Try another`)
        }
    }

    const userForUpadate = await User.findById(req.user._id);

    if (userForUpadate) {
        userForUpadate.firstname = firstname || userForUpadate.firstname;
        userForUpadate.lastname = lastname || userForUpadate.lastname;
        userForUpadate.email = email || userForUpadate.email;

        if (password) {
            userForUpadate.password = password
        }

        const user = await userForUpadate.save();

        if (user) {

            const token = user.genJwt(user._id)

            user.password = undefined

            res.status(200);
            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isAdmin: user.isAdmin,
                watched: user.watched,
                token
            })


        } else {
            res.status(500);
            throw new Error('User Update Failed')
        }



    } else {
        res.status(500);
        throw new Error(`User not found for update`)
    }
})