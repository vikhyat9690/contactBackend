const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc to register all users
//@route GET/api/register
// @access public
const user = require("../models/userModel");
const userRegister = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body;
    if(!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    } 
    const userAvailable = await user.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User already register.");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password : ", hashedPassword);
    const users = await user.create({
        userName,
        email,
        password: hashedPassword,
    })

    console.log(`User created ${user}`);
    if(users) {
        res.status(201).json({_id: users.id, email: users.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({
        message : "Register here",
    });
});

const userLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const users = await user.findOne({email});
    //compare password with hashed password

    if(users && (await bcrypt.compare(password, users.password))) {
        const accessToken = jwt.sign({
            users: {
                userName: users.userName,
                email: users.email,
                id: users.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
    )
        console.log("Access token is: ", accessToken);
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

const userCurrent = asyncHandler(async (req, res) => {
    res.json({
        message: "The current user information is here",
    });
});

module.exports = {userRegister, userLogin, userCurrent};