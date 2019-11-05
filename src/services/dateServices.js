const DateServices = {
    dateToString(date){
        return date.toISOString().slice(0,10)
    },
    stringToDate(date){
        return new Date(date)
    }
}
module.exports = DateServices