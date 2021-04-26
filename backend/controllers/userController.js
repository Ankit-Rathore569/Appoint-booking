const userModel = require('../models/userModel')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, mobile, password } = req.body
    userModel.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(422).json({
                errors: [{ user: "Email already exists" }]
            })
        } else {

            const userDeatails = new userModel({
                name, email, password, mobile
            })

            userDeatails.save().then(response => {
                res.status(200).json({
                    success: true,
                    result: response
                })

            }).catch(err => {
                res.status(500).json({
                    errors: [{ error: err }]
                })
            })

        }
    }).catch(err => {
        res.status(500).json({
            errors: [{ error: 'Something went wrong' }]
        });
    })
})

// Login User   => /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    // Finding email in database
    const user = await userModel.findOne({ email: email, password: password }).select('+password')

    // If User not found in database
    if (!user) {
        return next(new ErrorHandler("Invalid username or password", 401));
    }

    res.status(200).json({
        success: true,
        user
    })
})