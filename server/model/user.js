const {
    Schema,
    model
} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: null,
    },
    /* image: {
        type: String,
        default: null,
    }, */
    token: {
        type: String,
        default: null,
    },
    resetPasswordToken: String,
    resetPasswordTokenDate: Date,
    role: {
        type: String,
        required: true,
    }
}/* , {
    timestamps: true,
} */);

module.exports = model("User", userSchema);