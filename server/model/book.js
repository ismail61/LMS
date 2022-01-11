const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    edition : {
        type: String,
        required: true,
        trim: true
    },
    quantity : {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    adminId :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    deleted : {
        type : Boolean,
        default : false
    }
}/* , {
    timestamps: true
} */)

module.exports = model('Book',bookSchema)