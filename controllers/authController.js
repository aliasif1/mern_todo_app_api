const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;
var validator = require("email-validator");
const User = require('../models/user');
const { createJwtToken } = require('../services/authService');
 
// user sign up 
const userSignup = async (req, res) => {
    try{
        const {email, password} = req.body;
        // if email or password is empty
        if(!email || !password){
            return res.status(400).json({error: "All fields must be filled"});
        }
        // check for bad email
        if(!validator.validate(email)){
            return res.status(400).json({error: "Email is badly formatted"});
        }
        // check for bad password (< 6 characters)
        if(password.length < 6){
            return res.status(400).json({error: "Password must be atleast 6 characters in length"});
        }
        const savedUser = await User.userSignup(email, password);
        const token = createJwtToken({_id: savedUser._id ,email: savedUser.email});
        res.status(200).json({
            email: savedUser.email,
            token
        });
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

// user login 
const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
        // if email or password is empty
        if(!email || !password){
            return res.status(400).json({error: "All fields must be filled"});
        }
        // check for bad email
        if(!validator.validate(email)){
            return res.status(400).json({error: "Email is badly formatted"});
        }
        // check for bad password (< 6 characters)
        if(password.length < 6){
            return res.status(400).json({error: "Password must be atleast 6 characters in length"});
        }
        const savedUser = await User.userLogin(email, password);
        const token = createJwtToken({_id: savedUser._id ,email: savedUser.email});
        res.status(200).json({
            email: savedUser.email,
            token
        });
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    userSignup,
    userLogin
}

