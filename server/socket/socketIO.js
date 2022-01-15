
function socketImplementation(eventEmitter, io) {
    let orders = []
    let admins = []
    const addOrder = (orderId, socketId) => {
        !orders?.some(order => order.orderId === orderId) &&
            orders?.push({ orderId, socketId })
    }
    const addAdmin = (adminId, socketId) => {
        !admins?.some(admin => admin.adminId === adminId) &&
            admins?.push({ adminId, socketId })
    }
    const removeOrder = (socketId) => {
        orders = orders?.filter(order => order.socketId !== socketId)
    }
    const removeAdmin = (socketId) => {
        admins = admins?.filter(admin => admin.socketId !== socketId)
    }
    const getOrder = (orderId) => {
        return orders?.find(order => order.orderId == orderId)
    }
    const getAdmin = (adminId) => {
        return admins?.find(admin => admin.adminId == adminId)
    }

    io.on('connection', socket => {
        socket.on('addOrder', (orderId) => {
            addOrder(orderId, socket.id)
            io.emit("getOrders", orders)
        })

        socket.on('addAdmin', adminId => {
            addAdmin(adminId, socket.id)
            io.emit("getAdmins", admins)
        })

        socket.on('disconnect', () => {
            removeOrder(socket.id)
            removeAdmin(socket.id)
            io.emit("getOrders", orders)
        })
    })
    eventEmitter.on('orderUpdated', data => {
        let order = getOrder(data._id)
        io.to(order?.socketId).emit('orderUpdated', data)
    })
    eventEmitter.on('orderPaid', data => {
        let order = getOrder(data._id)
        io.to(order?.socketId).emit('orderPaid', data)
    })
    eventEmitter.on('orderPlaced', data => {
        let admin = getAdmin(data.adminId)
        io.to(admin?.socketId).emit('orderPlaced', data)
    })
    eventEmitter.on('orderRenewed', data => {
        let admin = getAdmin(data.adminId)
        io.to(admin?.socketId).emit('orderRenewed', data)
    })
    eventEmitter.on('orderDeleted', data => {
        let admin = getAdmin(data.adminId)
        io.to(admin?.socketId).emit('orderDeleted', data)
    })
    eventEmitter.on('orderReturned', data => {
        let order = getOrder(data._id)
        io.to(order?.socketId).emit('orderReturned', data)
    })
    eventEmitter.on('orderReturnedDateAssign', data => {
        let order = getOrder(data._id)
        io.to(order?.socketId).emit('orderReturnedDateAssign', data)
    })
    eventEmitter.on('bookAdded', data => {
        io.emit('bookAdded')
    })
    eventEmitter.on('bookDeleted', data => {
        io.emit('bookDeleted')
    })
    eventEmitter.on('bookUpdated', data => {
        io.emit('bookUpdated')
    })

}

module.exports = socketImplementation