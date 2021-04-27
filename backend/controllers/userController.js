const userModel = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');;

// Register a user   => /api/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, mobile, password } = req.body
    const user = await userModel.create({
        name,
        email,
        mobile,
        password,
    })

    sendToken(user, 200, res)
})

// Login User   => /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
})

// Get currently logged in user details   =>   /api/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Get all users   =>   /api/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await userModel.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Logout user   =>   /api/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})