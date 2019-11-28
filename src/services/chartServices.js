const ChartService = {
    
    monthlySums(services){
        const monthSum = [0,0,0,0,0,0,0,0,0,0,0,0]
        services.forEach(service=>{
            const myDate = new Date(service.service_date)
            const month = myDate.getMonth()
            monthSum[month] = monthSum[month] + service.cost
        })
        return monthSum
    }
    
}
export default ChartService