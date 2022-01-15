# LMS
Library Management System

📦client

📦server
 ┣ 📂auth
 ┃ ┣ 📜adminAuthenticate.js
 ┃ ┣ 📜pathAuthenticate.js
 ┃ ┗ 📜userAuthenticate.js
 ┣ 📂config
 ┃ ┗ 📂preventHackingMiddleware
 ┃ ┃ ┗ 📜middleware.js
 ┣ 📂controller
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜adminAccountController.js
 ┃ ┃ ┣ 📜adminBookController.js
 ┃ ┃ ┣ 📜adminDashboardController.js
 ┃ ┃ ┣ 📜adminOrderController.js
 ┃ ┃ ┗ 📜userControllerByAdmin.js
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜userAccountController.js
 ┃ ┃ ┣ 📜userBookController.js
 ┃ ┃ ┣ 📜userFineController.js
 ┃ ┃ ┗ 📜userOrderController.js
 ┃ ┗ 📜authController.js
 ┣ 📂error
 ┃ ┗ 📜error.js
 ┣ 📂model
 ┃ ┣ 📜book.js
 ┃ ┣ 📜order.js
 ┃ ┗ 📜user.js
 ┣ 📂patterns
 ┃ ┣ 📂factory
 ┃ ┃ ┗ 📜modelFactory.js
 ┃ ┗ 📂singleton
 ┃ ┃ ┗ 📜dbInstance.js
 ┣ 📂require
 ┃ ┣ 📜cloudinary.js
 ┃ ┣ 📜database.js
 ┃ ┗ 📜image.js
 ┣ 📂routes
 ┃ ┣ 📂admin
 ┃ ┃ ┗ 📜adminRoutes.js
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜authRoutes.js
 ┃ ┣ 📂user
 ┃ ┃ ┗ 📜userRoutes.js
 ┃ ┗ 📜routes.js
 ┣ 📂socket
 ┃ ┗ 📜socketIO.js
 ┣ 📂utils
 ┃ ┣ 📜emailTransport.js
 ┃ ┣ 📜generateToken.js
 ┃ ┗ 📜tryCatchHandle.js
 ┣ 📂validators
 ┃ ┣ 📜bookValidator.js
 ┃ ┣ 📜emailValidator.js
 ┃ ┣ 📜loginValidator.js
 ┃ ┣ 📜passwordValidator.js
 ┃ ┗ 📜registerValidator.js
