const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const services = require('../services/services.nodemailer')

/* 
* - user register api
* - POST request to /api/auth/register 
*/
async function userRegisterController(req,res){
    const {email,name,password} = req.body ;

    const isExist = await userModel.findOne({
        email : email
    })

    if(isExist){
        return res.status(422).json({
            messgae:"User already exist with email",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,name,password
    })

    const token = jwt.sign(
        {userID:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

/* 
* - user login 
* - /api/auth/login
*/
async function userLoginController(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email : email
    }).select("+password")

    if(!user){
        return res.status(401).json({
            messgae:"Email or password is invalid"
        })
    }

    const isValidPassword = await user.comparepassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            messgae:"Email or password is INVALID"
        })
    }

    const token = jwt.sign(
        {userID:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })

    await services.sendRegistrationEmail(user.email,user.name);
}

module.exports = {
    userRegisterController,
    userLoginController
}