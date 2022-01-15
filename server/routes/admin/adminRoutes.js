const authController = require('../../controller/authController'),
    adminBookController = require('../../controller/admin/adminBookController'),
    adminOrderController = require('../../controller/admin/adminOrderController'),
    adminAccountController = require('../../controller/admin/adminAccountController'),
    adminDashboardController = require('../../controller/admin/adminDashboardController'),
    userControllerByAdmin = require('../../controller/admin/userControllerByAdmin'),
    userFineController = require('../../controller/user/userFineController'),
    adminAuth = require('../../auth/adminAuthenticate'),
    tryCatch = require('../../utils/tryCatchHandle'),
    upload = require('../../require/image')
function adminRoutes(app) {
    //admin book
    app.post('/admin/add-book', adminAuth, upload.single('image'), tryCatch(adminBookController().addBook))
    app.get('/admin/add-book', adminAuth, tryCatch(adminBookController().addBookShow))
    app.patch('/admin/books/edit/:id', adminAuth, tryCatch(upload.single('image')), tryCatch(adminBookController().editBook))
    app.get('/admin/books', adminAuth, tryCatch(adminBookController().getAllBook))
    app.get('/admin/deleted-books', adminAuth, tryCatch(adminBookController().getAllDeletedBook))
    app.get('/admin/books/:id', adminAuth, tryCatch(adminBookController().getSingleBook))
    app.patch('/admin/books/delete/:id', adminAuth, tryCatch(adminBookController().temporaryDeleteBook))
    app.delete('/admin/books/delete/:id', adminAuth, tryCatch(adminBookController().permanentDeleteBook))
    app.patch('/admin/books/restore/:id', adminAuth, tryCatch(adminBookController().restoreBook))
    //admin order
    app.get('/admin/orders', adminAuth, tryCatch(adminOrderController().getAllOrder))
    app.get('/admin/orders/:id', adminAuth, tryCatch(adminOrderController().getSingleOrder))
    app.patch('/admin/orders/accepted/:id', adminAuth, tryCatch(adminOrderController().acceptOrder))
    app.patch('/admin/orders/rejected/:id', adminAuth, tryCatch(adminOrderController().rejectOrder))
    app.patch('/admin/orders/return-assign-date/:id', adminAuth, tryCatch(adminOrderController().returnAssignDate))
    app.patch('/admin/orders/paid/:id', adminAuth, tryCatch(adminOrderController().finePaid))
    app.patch('/admin/orders/returned/:id', adminAuth, tryCatch(adminOrderController().returnOrder))
    //admin account
    app.get('/admin/account', adminAuth, tryCatch(adminAccountController().getAdminInformation))
    app.patch('/admin/account', adminAuth, tryCatch(adminAccountController().updateAdminInformation))
    app.patch('/admin/account/password', adminAuth, tryCatch(adminAccountController().changePassword))
    //logout
    app.get('/admin/logout', adminAuth, tryCatch(authController().logout))

    //Pending order Count
    app.get('/admin/pending-orders', adminAuth, tryCatch(adminDashboardController().getAllPendingOrdersCount))
    //Return Order count
    app.get('/admin/returned-orders', adminAuth, tryCatch(adminDashboardController().getAllReturnedOrdersCount))
    //Total Fine Collection
    app.get('/admin/total-fine', adminAuth, tryCatch(adminDashboardController().getTotalFine))
    //getAllUsers
    app.get('/users', adminAuth, tryCatch(userControllerByAdmin().getAllUsers))
    //User Delete By Admin
    app.patch('/admin/fine', adminAuth, tryCatch(userFineController().addFineAUser))
}

module.exports = adminRoutes