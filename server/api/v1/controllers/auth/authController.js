const userSignin = require('../../services/auth/userSignin'),
    userSignup = require('../../services/auth/userSignup'),
    logout = require('../../services/auth/logout'),
    forgotPassword = require('../../services/auth/forgotPassword'),
    resetPassword = require('../../services/auth/resetPassword'),
    googleUserSignin = require('../../services/auth/googleUserSignin'),
    facebookUserSignin = require('../../services/auth/facebookUserSignin')
function userController() {
    return {
        userSigninPageShow: (req, res) => { res.status(200).json(req?.user) },
        userSignin: userSignin,
        userSignupPageShow: (req, res) => { res.status(200).json(req?.user) },
        userSignup: userSignup,
        logout: logout,
        forgotPasswordPageShow: (req, res) => { res.status(200).json(req.user) },
        forgotPassword: forgotPassword,
        resetPassword: resetPassword,
        googleUserSignin: googleUserSignin,
        facebookUserSignin: facebookUserSignin
    }
}
module.exports = userController

