
const calculateFine = (returnDate, status) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    let fineTk = 0;
    let daysDifference = 0
    if (returnDate && (status === 'accepted')) {
        let time = new Date(returnDate).getTime()
        let millisecondsTimeDifference = Date.now() - time
        //console.log(Date.now() + " - " + time + " = " + millisecondsTimeDifference)
        if (millisecondsTimeDifference > 0) {
            daysDifference = Math.floor(millisecondsTimeDifference / ONE_DAY)
            fineTk = daysDifference * 2
            return fineTk
        }
        return fineTk
    }
}

export { calculateFine }