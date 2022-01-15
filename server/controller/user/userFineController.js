
const Order = require('../../model/order'),
    ObjectId = require("mongoose").Types.ObjectId
function fineController() {
    return {
        addFineAUser: async (req, res) => {
            const data = await Order.findOneAndUpdate({ _id: req.body?._id, status: { $nin: ['rejected', 'pending', 'returned'] } }, { fine: req.body.fine }, { new: true })
            if(!data) return error().resourceError(res, "Failed!", 409);
            res.status(200).json(data)
        },
        findTotalFineAUser: async (req, res) => {
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
    }
}
module.exports = fineController