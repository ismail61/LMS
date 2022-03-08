const filteredOrders = (orders, searchValue, role) => {
    const filterOrders = orders?.filter(order => {
        if (role === "admin") {
            return (
                order?.bookId?.title?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.bookId?.author?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.fine?.toString().toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.userId?.name?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.userId?.email?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.createdAt?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.returnDate?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.status?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
            )
        } else {
            return (
                order?.bookId?.title?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.bookId?.author?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.fine?.toString().toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
                order?.status?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
            )
        }

    });
    return filterOrders
}
export { filteredOrders }