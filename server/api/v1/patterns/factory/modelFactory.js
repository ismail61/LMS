const User = require('../../models/user'),
    Book = require('../../models/book'),
    Order = require('../../models/order')
module.exports = modelFactory = (type, data) => {
    if (type === 'user') {
        return new User(data)
    }
    else if (type === 'book') {
        return new Book(data)
    }
    else if (type === 'order') {
        return new Order(data)
    }
}