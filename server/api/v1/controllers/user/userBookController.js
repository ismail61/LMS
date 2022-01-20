
const getBooks = require('../../services/user/books/getBooks')
function userBookController() {
    return {
        getAllBook: getBooks
    }
}
module.exports = userBookController