# LMS
Library Management System

📦client<br />


📦server<br />
 ┣ 📂__tests__<br />
 ┃ ┣ 📂admin<br />
 ┃ ┣ 📂user<br />
 ┃ ┃ ┗ 📜user.order.test.js<br />
 ┃ ┗ 📜auth.test.js<br />
 ┣ 📂api<br />
 ┃ ┗ 📂v1<br />
 ┃ ┃ ┣ 📂controllers<br />
 ┃ ┃ ┃ ┣ 📂admin<br />
 ┃ ┃ ┃ ┃ ┣ 📜adminAccountController.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜adminBookController.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜adminDashboardController.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜adminOrderController.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜index.js<br />
 ┃ ┃ ┃ ┃ ┗ 📜userControllerByAdmin.js<br />
 ┃ ┃ ┃ ┣ 📂auth<br />
 ┃ ┃ ┃ ┃ ┗ 📜authController.js<br />
 ┃ ┃ ┃ ┗ 📂user<br />
 ┃ ┃ ┃ ┃ ┣ 📜index.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜userAccountController.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜userBookController.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜userFineController.js<br />
 ┃ ┃ ┃ ┃ ┗ 📜userOrderController.js<br />
 ┃ ┃ ┣ 📂middlewares<br />
 ┃ ┃ ┃ ┣ 📜adminAuth.middleware.js<br />
 ┃ ┃ ┃ ┣ 📜hack.middleware.js<br />
 ┃ ┃ ┃ ┣ 📜image.middleware.js<br />
 ┃ ┃ ┃ ┣ 📜pathAuth.middleware.js<br />
 ┃ ┃ ┃ ┗ 📜userAuth.middleware.js<br />
 ┃ ┃ ┣ 📂models<br />
 ┃ ┃ ┃ ┣ 📜book.js<br />
 ┃ ┃ ┃ ┣ 📜order.js<br />
 ┃ ┃ ┃ ┗ 📜user.js<br />
 ┃ ┃ ┣ 📂patterns<br />
 ┃ ┃ ┃ ┣ 📂factory<br />
 ┃ ┃ ┃ ┃ ┗ 📜modelFactory.js<br />
 ┃ ┃ ┃ ┗ 📂singleton<br />
 ┃ ┃ ┃ ┃ ┗ 📜dbInstance.js<br />
 ┃ ┃ ┣ 📂routes<br />
 ┃ ┃ ┃ ┣ 📜admin.routes.js<br />
 ┃ ┃ ┃ ┣ 📜auth.routes.js<br />
 ┃ ┃ ┃ ┣ 📜index.js<br />
 ┃ ┃ ┃ ┗ 📜user.routes.js<br />
 ┃ ┃ ┣ 📂services<br />
 ┃ ┃ ┃ ┣ 📂admin<br />
 ┃ ┃ ┃ ┃ ┣ 📂books<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜addBook.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜editBook.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getBooks.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getDeleteBooks.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜permanentDeleteBook.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜restoreBook.js<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜temporaryDeleteBook.js<br />
 ┃ ┃ ┃ ┃ ┣ 📂dashboard<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getAllPendingOrdersCount.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getAllReturnedOrdersCount.js<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜getTotalFine.js<br />
 ┃ ┃ ┃ ┃ ┗ 📂orders<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜acceptOrder.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜finePaid.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getAllOrder.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜rejectOrder.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜returnAssignDate.js<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜returnOrder.js<br />
 ┃ ┃ ┃ ┣ 📂auth<br />
 ┃ ┃ ┃ ┃ ┣ 📜facebookUserSignin.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜forgotPassword.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜googleUserSignin.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜logout.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜resetPassword.js<br />
 ┃ ┃ ┃ ┃ ┣ 📜userSignin.js<br />
 ┃ ┃ ┃ ┃ ┗ 📜userSignup.js<br />
 ┃ ┃ ┃ ┣ 📂common<br />
 ┃ ┃ ┃ ┃ ┗ 📂account<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜changeUserPassword.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getUserInformation.js<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜updateUserInformation.js<br />
 ┃ ┃ ┃ ┗ 📂user<br />
 ┃ ┃ ┃ ┃ ┣ 📂books<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜getBooks.js<br />
 ┃ ┃ ┃ ┃ ┣ 📂fine<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜addFine.js<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜findTotalFine.js<br />
 ┃ ┃ ┃ ┃ ┗ 📂orders<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜deleteOrder.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getAllOrder.js<br />
 ┃ ┃ ┃ ┃ ┃ ┣ 📜makeOrder.js<br />
 ┃ ┃ ┃ ┃ ┃ ┗ 📜renewOrder.js<br />
 ┃ ┃ ┣ 📂utils<br />
 ┃ ┃ ┃ ┣ 📂error<br />
 ┃ ┃ ┃ ┃ ┗ 📜error.js<br />
 ┃ ┃ ┃ ┣ 📜emailTransport.js<br />
 ┃ ┃ ┃ ┣ 📜generateToken.js<br />
 ┃ ┃ ┃ ┗ 📜tryCatchHandle.js<br />
 ┃ ┃ ┣ 📂validations<br />
 ┃ ┃ ┃ ┣ 📜book.validator.js<br />
 ┃ ┃ ┃ ┣ 📜email.validator.js<br />
 ┃ ┃ ┃ ┣ 📜login.validator.js<br />
 ┃ ┃ ┃ ┣ 📜password.validator.js<br />
 ┃ ┃ ┃ ┗ 📜register.validator.js<br />
 ┃ ┃ ┗ 📜app.js<br />
 ┣ 📂config<br />
 ┃ ┣ 📂cloudinary<br />
 ┃ ┃ ┗ 📜cloudinary.js<br />
 ┃ ┗ 📂database<br />
 ┃ ┃ ┗ 📜database.js<br />
 ┃ ┃ ┣ config.js
 ┣ 📂socket<br />
 ┃ ┗ 📜socketIO.js<br />
 ┣ 📜package.json<br />
 ┣ 📜server.js
