function getTotalSeat(Seats){
    let totalSeat = 0
    Seats.forEach(el => {
        if(!el.status){
            totalSeat++
        }
    });
    return totalSeat
}


module.exports = getTotalSeat