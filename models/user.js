const mongoose = require('mongoose');
const { createHashedPassword, verifyPassword } = require('../services/authService');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.userSignup = async function(email, password){
    // check if user alreadu exists
    const user = await this.findOne({email: email});
    if (user) {
        throw Error('Email already registered');
    }
    const hashedPassword = await createHashedPassword(password)
    const savedUser = await this.create({email, password: hashedPassword});
    return savedUser;
}

userSchema.statics.userLogin = async function(email, password){
    // check if user email exists
    const user = await this.findOne({email: email});
    if (!user) {
        throw Error('Incorrect Email');
    }
    // check if password is correct
    if (!(await verifyPassword(password, user.password))){
        throw Error('Incorrect Credentials');
    }
    return user;
}

module.exports = (mongoose.model('User', userSchema));