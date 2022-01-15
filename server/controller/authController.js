const registerValidator = require('../validators/registerValidator'),
    npmValidator = require('validator'),
    loginValidator = require('../validators/loginValidator'),
    emailValidator = require('../validators/emailValidator'),
    generateToken = require('../utils/generateToken'),
    error = require('../error/error'),
    User = require('../model/user'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.BACKEND_GOOGLE_CLIENT_ID),
    fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)),
    { mailSend } = require('../utils/emailTransport'),
    modelFactory = require('../patterns/factory/modelFactory')
function userController() {
    return {
        userSigninPageShow: (req, res) => {
            res.status(200).json(req?.user)
        },

        userSignin: async (req, res) => {
            const { email, password, role } = req.body
            const validator = await loginValidator(email, password, role)
            if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)

            const user = await User.findOne({ email, role })
            if (!user) return error().resourceError(res, 'Invalid Credentials', 401)

            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials', 401)

            const verifyTokenTracker = await crypto.randomBytes(8).toString("hex")
            const token = await generateToken(user, verifyTokenTracker)
            await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
            res.status(200).json({ token: token, role: user.role })
        },


        userSignupPageShow: (req, res) => {
            res.status(200).json(req?.user)
        },

        userSignup: async (req, res) => {
            const { name, email, password, role } = req.body
            const validator = await registerValidator(req.body)
            if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)

            const user = await User.findOne({ email: email, role: role });
            if (user) return error().resourceError(res, 'Email already exists. Please choose a different Email', 409)

            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = modelFactory('user', { name: npmValidator.escape(name), email: npmValidator.escape(email?.toLowerCase()), password: hashPassword, role })
            const data = await newUser.save()
            res.status(201).json(data)
        },


        logout: async (req, res) => {
            if (req.user?.role == 'admin') {
                await User.findOneAndUpdate({ _id: req.user._id }, { token: null }, { new: true }).exec();
                res.status(200).json({ role: 'admin', message: 'Successfully Logout' })
            } else if (req.user?.role == 'user') {
                await User.findOneAndUpdate({ _id: req.user._id }, { token: null }, { new: true }).exec();
                res.status(200).json({ role: 'user', message: 'Successfully Logout' })
            } else { return error().resourceError(res, "You don't have enough permission to perform this action"), 403 }
        },


        forgotPasswordPageShow: (req, res) => {
            res.status(200).json(req.user)
        },

        forgotPassword: async (req, res) => {
            //const { email, role } = req.query
            const TEN_MINUTES = 10 * 60 * 1000,
                { email, role } = req.body,
                url = req.protocol + '://' + req.get('host'),
                RESET_PASSWORD_EXPIRE_DATE = TEN_MINUTES // 10 minutes
            const validator = await emailValidator(email)
            if (!validator.isValid) return error().resourceError(res, validator.error?.email, 422)
            const user = await User.findOne({ email: email, role: role })
            if (!user) return error().resourceError(res, 'This email address have no account', 401)
            const resetPasswordToken = await crypto.randomBytes(16).toString("hex")
            await User.findOneAndUpdate({ _id: user._id }, { resetPasswordToken, resetPasswordTokenDate: Date.now() + RESET_PASSWORD_EXPIRE_DATE }, { new: true }).exec()
            const urlWithToken = `${url}/reset-password?token=${resetPasswordToken}`
            const response = await mailSend(email, urlWithToken)
            if (!response) return error().resourceError(res, "Email Send Failed", 409);
            res.status(200).json(response)
            //res.json(`http://localhost:3000/reset-password?token=${resetPasswordToken}`)
        },


        resetPassword: async (req, res) => {
            //if (req.user) return error().resourceError(res, 'You are already Logged In', 409)
            const { password, resetPasswordToken } = req.body
            if (resetPasswordToken?.length != 32) return error().resourceError(res, 'Invalid Token', 401)
            const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordTokenDate: { $gt: Date.now() } })
            if (!user) return error().resourceError(res, 'Reset Token has been expired.', 401)
            const hashPassword = await bcrypt.hash(password, 10)
            const data = await User.findOneAndUpdate({ _id: user._id }, { password: hashPassword, resetPasswordToken: null, resetPasswordTokenDate: null, token: null }, { new: true }).exec()
            if (!data) return error().resourceError(res, "Password Reset Failed", 409);
            res.status(200).json({ role: data.role })
        },


        googleUserSignin: async (req, res) => {
            const { tokenId, role } = req.body
            const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.BACKEND_GOOGLE_CLIENT_ID }),
                { email_verified, name, email } = response.payload
            if (!email_verified || !role) return error().resourceError(res, 'Email Verification Failed', 401)
            const user = await User.findOne({ email, role })
            if (user) {
                const verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(user, verifyTokenTracker)
                await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
                res.status(200).json({ token: token, role: user.role })
            } else {
                let password = email + 'password'
                const hashPassword = await bcrypt.hash(password, 10),
                    newUser = modelFactory('user', { name, email, password: hashPassword, role }),
                    newRegisteredUser = await newUser.save(),
                    verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(newRegisteredUser, verifyTokenTracker)
                await User.findByIdAndUpdate(newRegisteredUser._id, { token: verifyTokenTracker }, { new: true })
                res.status(200).json({ token: token, role: newRegisteredUser.role })
            }
        },


        facebookUserSignin: async (req, res) => {
            const { accessToken, userID, role } = req.body
            let urlGraphFB = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
            const response = await fetch(urlGraphFB)
            const data = await response.json()
            if (!data || !role) return error().resourceError(res, 'Email Verification Failed', 401)
            const { email, name } = data
            const user = await User.findOne({ email, role })
            if (user) {
                const verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(user, verifyTokenTracker)
                await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
                res.status(200).json({ token: token, role: user.role })
            } else {
                let password = email + 'password'
                const hashPassword = await bcrypt.hash(password, 10),
                    newUser = modelFactory('user', { name, email, password: hashPassword, role }),
                    newRegisteredUser = await newUser.save(),
                    verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(newRegisteredUser, verifyTokenTracker)
                await User.findByIdAndUpdate(newRegisteredUser._id, { token: verifyTokenTracker }, { new: true })
                res.status(200).json({ token: token, role: newRegisteredUser.role })
            }
        }
    }
}


module.exports = userController

