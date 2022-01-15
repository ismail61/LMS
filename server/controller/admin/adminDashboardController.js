const Order = require('../../model/order'),
    ObjectId = require("mongoose").Types.ObjectId
function dashboardController() {
    return {
        getAllPendingOrdersCount: async (req, res) => {
            const data = await Order.find({ adminId: req.user._id, status: { $eq: 'pending' } }).countDocuments(1)
            res.status(200).json(data)
        },
        getAllReturnedOrdersCount: async (req, res) => {
            const data = await Order.find({ adminId: req.user._id, status: { $eq: 'returned' } }).countDocuments(1)
            res.status(200).json(data)
        },
        getTotalFine: async (req, res) => {
            const filter = { adminId: ObjectId(req.user._id), paid: true };
            let data = await Order.aggregate([
                { $match: filter }, {
                    $group: {
                        '_id': '$adminId',
                        total: {
                            $sum: '$fine'
                        }
                    }
                }
            ])
            res.status(200).json(data[0]?.total)
        }
    }
}
module.exports = dashboardController