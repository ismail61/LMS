import Cookies from 'js-cookie';

const inputNames = ["isbn", "title", "author", "edition", "quantity"],
    labels = ["ISBN", "Title", "Author", "Edition", "Quantity"],
    placeholders = ["Enter Book's ISBN", "Enter Book's Title", "Enter Book's Author", "Enter Book's Edition", "Enter The Book's Quantity"],
    adminToken = Cookies.get('adminwebtoken'),
    userToken = Cookies.get('userwebtoken'),
    headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    //url = 'https://librarymanagementstm.herokuapp.com',
    url = 'http://localhost:5555',
    userInputs = ["name", "description"],
    userLabels = ["Name", "Description"]
export { inputNames, labels, placeholders, headerOptions, adminToken, userToken, url, userInputs, userLabels }