import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        maxlength: [80, `Firstname length should be 50 char max`],
        required: [true, `Firstname field is mandatory`]
    },
    lastname: {
        type: String,
        maxlength: [80, `Lastname length should be 50 char max`],
        required: [true, `Lastname field is mandatory`]
    },

    email: {
        type: String,
        required: [true, `Email field is mandatory`],
        unique: true
    },

    password: {
        type: String,
        required: [true, `Password field is mandatory`],

    },
    watched: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })




userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10);

})


userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)

}


userSchema.methods.genJwt = function (id) {

    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '2d' })
    return token

}






const User = mongoose.model("User", userSchema)

export default User