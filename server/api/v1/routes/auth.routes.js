const authController = require('../controllers/auth/authController'),
    pathAuth = require('../middlewares/pathAuth.middleware'),
    tryCatch = require('../utils/tryCatchHandle')
function authRoutes(app) {
    app.get('/sign-in', pathAuth, tryCatch(authController().userSigninPageShow))
    app.post('/sign-in', pathAuth, tryCatch(authController().userSignin))
    app.get('/sign-up', pathAuth , tryCatch(authController().userSignupPageShow))
    app.post('/sign-up', pathAuth , tryCatch(authController().userSignup))
    app.get('/forgot-password', pathAuth , tryCatch(authController().forgotPasswordPageShow))
    app.post('/forgot-password', pathAuth , tryCatch(authController().forgotPassword))
    app.put('/forgot-password', pathAuth , tryCatch(authController().resetPassword))
    //Google Sign-in
    app.post('/google/sign-in', pathAuth , tryCatch(authController().googleUserSignin))
    //Facebook Sign-in
    app.post('/facebook/sign-in', pathAuth , tryCatch(authController().facebookUserSignin))
}
module.exports = authRoutes