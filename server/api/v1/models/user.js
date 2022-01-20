const { Schema, model } = require("mongoose");
const roles = ['user', 'admin', 'superAdmin']
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
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
    token: {
        type: String,
        default: null,
    },
    resetPasswordToken: String,
    resetPasswordTokenDate: Date,
    role: {
        type: String,
        enum: roles,
        required: true,
    },
    activated: {
        type: Boolean,
        required: isEligibleForAdmin
    }
}/* , {
    timestamps: true,
} */);

function isEligibleForAdmin() {
    if ("admin".indexOf(this.role) > -1) {       
        return true;
    }
    return false;
}

module.exports = model("User", userSchema);
