const registerValidator = require('../validators/registerValidator'),
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
            res.json(req?.user)
        },
        userSignin: async (req, res) => {
            const { email, password, role } = req.body
            const validator = await loginValidator(email, password, role)
            if (!validator.isValid) res.json({ err: validator.error })
            const user = await User.findOne({ email, role })
            if (!user) return error().resourceError(res, 'Invalid Credentials')
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials')
            const verifyTokenTracker = await crypto.randomBytes(8).toString("hex")
            const token = await generateToken(user, verifyTokenTracker)
            await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
            res.json({ token: token, role: user.role })
        },
        userSignupPageShow: (req, res) => {
            res.json(req?.user)
        },
        userSignup: async (req, res) => {
            const { name, email, password, role } = req.body
            const validator = await registerValidator(req.body)
            if (!validator.isValid) res.json({ err: validator.error })
            const user = await User.findOne({ email: email, role: role });
            if (user) return error().resourceError(res, 'Email already exists. Please choose a different Email')
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = modelFactory('user', { name, email, password: hashPassword, role })
            const data = await newUser.save()
            res.json(data)
        },
        logout: async (req, res) => {
            if (req.user?.role == 'admin') {
                await User.findOneAndUpdate({ _id: req.user._id }, { token: null }, { new: true }).exec();
                res.json({ role: 'admin', message: 'Successfully Logout' })
            } else if (req.user?.role == 'user') {
                await User.findOneAndUpdate({ _id: req.user._id }, { token: null }, { new: true }).exec();
                res.json({ role: 'user', message: 'Successfully Logout' })
            } else { return error().resourceError(res, "You don't have enough permission to perform this action") }
        },
        forgotPasswordPageShow: (req, res) => {
            res.json(req.user)
        },
        forgotPassword: async (req, res) => {
            //const { email, role } = req.query
            const TEN_MINUTES = 10 * 60 * 1000,
                { email, role } = req.body,
                url = req.protocol + '://' + req.get('host'),
                RESET_PASSWORD_EXPIRE_DATE = TEN_MINUTES // 10 minutes
            const validator = await emailValidator(email)
            if (!validator.isValid) res.json({ err: validator.error.email })
            const user = await User.findOne({ email: email, role: role })
            if (!user) return error().resourceError(res, 'This email address have no account')
            const resetPasswordToken = await crypto.randomBytes(16).toString("hex")
            await User.findOneAndUpdate({ _id: user._id }, { resetPasswordToken, resetPasswordTokenDate: Date.now() + RESET_PASSWORD_EXPIRE_DATE }, { new: true }).exec()
            const urlWithToken = `${url}/reset-password?token=${resetPasswordToken}`
            const response = await mailSend(email, urlWithToken)
            res.json(response)
            //res.json(`http://localhost:3000/reset-password?token=${resetPasswordToken}`)
        },
        resetPassword: async (req, res) => {
            if (req.user) return error().resourceError(res, req.user?.role)
            const { password, resetPasswordToken } = req.body
            if (resetPasswordToken?.length != 32) return error().resourceError(res, 'Invalid Token')
            const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordTokenDate: { $gt: Date.now() } })
            if (!user) return error().resourceError(res, 'Reset Token has been expired.')
            const hashPassword = await bcrypt.hash(password, 10)
            const data = await User.findOneAndUpdate({ _id: user._id }, { password: hashPassword, resetPasswordToken: null, resetPasswordTokenDate: null }, { new: true }).exec()
            res.json({ role: data.role })
        },
        googleUserSignin: async (req, res) => {
            const { tokenId, role } = req.body
            const response = await client.verifyIdToken({ idToken: tokenId, audience: "490147009025-pnntt95e8kel42or33obmh5d14oag43s.apps.googleusercontent.com" }),
                { email_verified, name, email } = response.payload
            if (!email_verified || !role) return error().resourceError(res, 'Email Verification Failed')
            const user = await User.findOne({ email, role })
            if (user) {
                const verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(user, verifyTokenTracker)
                await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
                res.json({ token: token, role: user.role })
            } else {
                let password = email + 'password'
                const hashPassword = await bcrypt.hash(password, 10),
                    newUser = modelFactory('user', { name, email, password: hashPassword, role }),
                    newRegisteredUser = await newUser.save(),
                    verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(newRegisteredUser, verifyTokenTracker)
                await User.findByIdAndUpdate(newRegisteredUser._id, { token: verifyTokenTracker }, { new: true })
                res.json({ token: token, role: newRegisteredUser.role })
            }
        },
        facebookUserSignin: async (req, res) => {
            const { accessToken, userID, role } = req.body
            let urlGraphFB = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
            const response = await fetch(urlGraphFB)
            const data = await response.json()
            if (!data || !role) return error().resourceError(res, 'Email Verification Failed')
            const { email, name } = data
            const user = await User.findOne({ email, role })
            if (user) {
                const verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(user, verifyTokenTracker)
                await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
                res.json({ token: token, role: user.role })
            } else {
                let password = email + 'password'
                const hashPassword = await bcrypt.hash(password, 10),
                    newUser = modelFactory('user', { name, email, password: hashPassword, role }),
                    newRegisteredUser = await newUser.save(),
                    verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
                    token = await generateToken(newRegisteredUser, verifyTokenTracker)
                await User.findByIdAndUpdate(newRegisteredUser._id, { token: verifyTokenTracker }, { new: true })
                res.json({ token: token, role: newRegisteredUser.role })
            }
        }
    }
}


module.exports = userController

