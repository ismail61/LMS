const User = require('../../model/user'),
    Book = require('../../model/book'),
    Order = require('../../model/order')
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