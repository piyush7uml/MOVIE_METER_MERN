import express from 'express';
import { registerUser, loginUser, setWatchedList, deleteUser, getWatchedList, getAllUsers, updateUser } from '../Controllers/userControllers.js';
import { auth, isAdmin } from '../utils/routesProtection.js'

const router = express.Router();


// REGISTER USER
router.post("/register", registerUser)

//LOGIN USER
router.post("/login", loginUser)

// SET WATCHED LIST
router.get("/watchlist/:movieId/set", auth, setWatchedList)

// DELETE USER
router.delete("/delete/:id", auth, deleteUser)

// GET WATCHED LIST
router.get("/getWatchedList", auth, getWatchedList)

// GET USERS FOR ADMIN
router.get("/getUsers", auth, isAdmin, getAllUsers)

// UPDATE USER
router.put("/update", auth, updateUser)



export default router;