import express from 'express';
const app = express();
import path from 'path';
const __dirname = path.resolve();

import colors from 'colors';

// .ENV CONFIG
import dotenv from 'dotenv';
dotenv.config();

//cors
import cors from 'cors'
app.use(cors())

//Body Parser
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }))


// DB Connection
import connectDB from './configs/connectDB.js';
connectDB();


// Importing Routes
import userRoutes from './Routes/userRoutes.js';
import movieRoutes from './Routes/movieRoutes.js';
import reviewRoutes from './Routes/reviewRoutes.js';


//Importing Error Handler
import { notFound, expressErrorHandler } from './configs/errorHandlers.js';



// Routes
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/review", reviewRoutes)





//SERVING THE FRONTEND(PRODUCTION)

app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"))

})


// ERROR HANDLERS
app.use(notFound);
app.use(expressErrorHandler)

// STARTING SERVER
const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log(`App is running at port ${port}`.green)
})