const userModel = require('../models/userModel')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

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