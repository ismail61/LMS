const authController = require('../controllers/auth/authController'),
    {userOrderController,userBookController,userAccountController,userFineController} = require('../controllers/user/index'),
    userAuth = require('../middlewares/userAuth.middleware'),
    tryCatch = require('../utils/tryCatchHandle')
function userRoutes(app) {
    //User book
    app.get('/user/books', userAuth, tryCatch(userBookController().getAllBook))
    app.post('/user/make-order', userAuth, tryCatch(userOrderController().makeOrder))

    //user account
    app.get('/user/account', userAuth, tryCatch(userAccountController().getUserInformation))
    app.patch('/user/account', userAuth, tryCatch(userAccountController().updateUserInformation))
    app.patch('/user/account/password', userAuth, tryCatch(userAccountController().changePassword))
    //user order
    app.get('/user/orders', userAuth, tryCatch(userOrderController().getAllOrder))
    /* app.get('/user/orders/:id', userAuth, tryCatch(userOrderController().getSingleOrder)) */
    app.patch('/user/orders/:id', userAuth, tryCatch(userOrderController().renewOrder))
    app.delete('/user/orders/:id', userAuth, tryCatch(userOrderController().deleteOrder))

    app.get('/user/logout', userAuth, tryCatch(authController().logout))
    //user order fine
    app.patch('/user/fine', userAuth, tryCatch(userFineController().addFineAUser))
    app.get('/user/fine', userAuth, tryCatch(userFineController().findTotalFineAUser))
}
module.exports = userRoutes