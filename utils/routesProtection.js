import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js'


export const auth = asyncHandler(async (req, res, next) => {

    let token;

    if ((req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {

        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRET);

            req.user = await User.findById(decoded.id)

            return next()


        } catch (error) {
            res.status(401);
            throw new Error(`Token failed`)
        }
    }


    if (!token) {
        res.status(401);
        throw new Error(`Token not found`)
    }

})


// ADMIN AUTH


export const isAdmin = asyncHandler((req, res, next) => {

    if (req.user.isAdmin === true) {
        next()
    } else {
        res.status(403);
        throw new Error(`Access Denied...admin section `)
    }
})