const DateServices = {
    convertToformat(date){
        return date.toISOString().slice(0,10)
    }
}
module.exports = DateServices