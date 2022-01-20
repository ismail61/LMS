
function routes(app) {
    require('./auth.routes.js')(app)
    require('./admin.routes.js')(app)
    require('./user.routes.js')(app)
}

module.exports = routes