import express from 'express';
const router = express.Router();
import { auth } from '../utils/routesProtection.js';
import { createReview, updateReview, deleteReview, getReviewsByMovie, getReviewById, getReviewsByUser } from '../Controllers/reviewControllers.js';

//CREATE REVIEW
router.post("/create/:movieId", auth, createReview);

// UPDATE REVIEW
router.put("/update/:reviewId", auth, updateReview);

// DELETE REVIEW
router.delete("/delete/:reviewId", auth, deleteReview)

// GET REVIEWS BY MOVIE
router.get("/getByMovie/:movieId/get", getReviewsByMovie)

// GET REVIEW BY ID
router.get("/get/:reviewId", auth, getReviewById)

// GET REVIEWS BY USER
router.get("/getByUser", auth, getReviewsByUser)


export default router