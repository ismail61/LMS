
function routes(app) {
    require('./auth/authRoutes.js')(app)
    require('./admin/adminRoutes.js')(app)
    require('./user/userRoutes.js')(app)
}

module.exports = routes