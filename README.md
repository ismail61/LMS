# LMS
Library Management System

📦client

📦server<br/>
 ┣ 📂auth<br/>
 ┃ ┣ 📜adminAuthenticate.js<br/>
 ┃ ┣ 📜pathAuthenticate.js<br/>
 ┃ ┗ 📜userAuthenticate.js<br/>
 ┣ 📂config<br/>
 ┃ ┗ 📂preventHackingMiddleware<br/>
 ┃ ┃ ┗ 📜middleware.js<br/>
 ┣ 📂controller<br/>
 ┃ ┣ 📂admin<br/>
 ┃ ┃ ┣ 📜adminAccountController.js<br/>
 ┃ ┃ ┣ 📜adminBookController.js<br/>
 ┃ ┃ ┣ 📜adminDashboardController.js<br/>
 ┃ ┃ ┣ 📜adminOrderController.js<br/>
 ┃ ┃ ┗ 📜userControllerByAdmin.js<br/>
 ┃ ┣ 📂user<br/>
 ┃ ┃ ┣ 📜userAccountController.js<br/>
 ┃ ┃ ┣ 📜userBookController.js<br/>
 ┃ ┃ ┣ 📜userFineController.js<br/>
 ┃ ┃ ┗ 📜userOrderController.js<br/>
 ┃ ┗ 📜authController.js<br/>
 ┣ 📂error<br/>
 ┃ ┗ 📜error.js<br/>
 ┣ 📂model<br/>
 ┃ ┣ 📜book.js<br/>
 ┃ ┣ 📜order.js<br/>
 ┃ ┗ 📜user.js<br/>
 ┣ 📂patterns<br/>
 ┃ ┣ 📂factory<br/>
 ┃ ┃ ┗ 📜modelFactory.js<br/>
 ┃ ┗ 📂singleton<br/>
 ┃ ┃ ┗ 📜dbInstance.js<br/>
 ┣ 📂require<br/>
 ┃ ┣ 📜cloudinary.js<br/>
 ┃ ┣ 📜database.js<br/>
 ┃ ┗ 📜image.js<br/>
 ┣ 📂routes<br/>
 ┃ ┣ 📂admin<br/>
 ┃ ┃ ┗ 📜adminRoutes.js<br/>
 ┃ ┣ 📂auth<br/>
 ┃ ┃ ┗ 📜authRoutes.js<br/>
 ┃ ┣ 📂user<br/>
 ┃ ┃ ┗ 📜userRoutes.js<br/>
 ┃ ┗ 📜routes.js<br/>
 ┣ 📂socket<br/>
 ┃ ┗ 📜socketIO.js<br/>
 ┣ 📂utils<br/>
 ┃ ┣ 📜emailTransport.js<br/>
 ┃ ┣ 📜generateToken.js<br/>
 ┃ ┗ 📜tryCatchHandle.js<br/>
 ┣ 📂validators<br/>
 ┃ ┣ 📜bookValidator.js<br/>
 ┃ ┣ 📜emailValidator.js<br/>
 ┃ ┣ 📜loginValidator.js<br/>
 ┃ ┣ 📜passwordValidator.js<br/>
 ┃ ┗ 📜registerValidator.js<br/>
