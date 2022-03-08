const filteredBooks = (books, searchValue) => {
    const filterBooks = books?.filter(book => {
        return (
            book?.title?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
            book?.author?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
            book?.edition?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 ||
            book?.quantity?.toString().toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 
        )
    });
    return filterBooks
}
export { filteredBooks }