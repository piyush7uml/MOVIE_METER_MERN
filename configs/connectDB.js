import mongoose from 'mongoose';


//DATABASE CONNECTION

const connectDB = () => {

    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`DB Connected Successfully`.green)
        })
        .catch((error) => {
            console.log(`DB Connection Failed:-${error.message}`.red)
            process.exit(1)
        })
}

export default connectDB