import express from 'express';
const router = express.Router();
import { auth, isAdmin } from '../utils/routesProtection.js';
import { createMovie, updateMovie, deleteMovie, getMovie, getAllMovie } from '../Controllers/movieControllers.js';

//CREATE MOVIE
router.post('/create', auth, isAdmin, createMovie);

//UPADTE MOVIE
router.put('/update/:id', auth, isAdmin, updateMovie);

//DELETE MOVIE
router.delete('/delete/:id', auth, isAdmin, deleteMovie);

//GET SINGLE MOVIE
router.get('/get/:id', getMovie);

// GET ALL MOVIES
router.get('/getAll', getAllMovie)




export default router