const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    status: {
        type: String,
        enum: ['pending', 'rejected', 'accepted', 'returned'],
        default: 'pending'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    returnDate: {
        type: Date
    },
    fine: {
        type: Number,
        default: 0
    },
    paid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

module.exports = model('Order', orderSchema)