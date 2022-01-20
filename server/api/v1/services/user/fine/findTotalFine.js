const Order = require("../../../models/order"),
    ObjectId = require("mongoose").Types.ObjectId
module.exports = async (req, res) => {
    const filter = { userId: ObjectId(req.user._id), paid: false };
    let data = await Order.aggregate([
        { $match: filter }, {
            $group: {
                '_id': '$userId',
                total: {
                    $sum: '$fine'
                }
            }
        }
    ])
    res.status(200).json(data[0]?.total)
}