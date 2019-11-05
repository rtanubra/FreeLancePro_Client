const DateServices = {
    dateToString(date){
        return date.toISOString().slice(0,10)
    },
    stringToDate(date){
        return new Date(date)
    },
    dbToDate(date){

    },
    dbToString(date){
        return date.substring(0,10)
    }
}
module.exports = DateServices