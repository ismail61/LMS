const env = process.env.NODE_ENV; 
const { PORT, DB_URL, TEST_URL, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, TOKEN_KEY, BACKEND_GOOGLE_CLIENT_ID } = process.env

const development = {
    app: {
        port: parseInt(PORT) || 5555
    },
    db: {
        url: DB_URL
    },
    cloudinary: {
        name: CLOUDINARY_NAME,
        api: CLOUDINARY_API_KEY,
        secret: CLOUDINARY_API_SECRET
    },
    jwtToken: {
        key: TOKEN_KEY
    },
    google: {
        client_id: BACKEND_GOOGLE_CLIENT_ID
    }
};

const test = {
    app: {
        port: parseInt(PORT) || 5555
    },
    db: {
        url: TEST_URL
    }
};

const config = {
    development,
    test
}

module.exports = config[env];