const rateLimit = require('express-rate-limit')
var xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize');
function middleware(app) {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
    
    // Apply the rate limiting middleware to all requests
    app.use(limiter)
    app.use(xss())
    app.use(mongoSanitize());
}

module.exports = middleware