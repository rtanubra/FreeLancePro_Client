const NumberService = {
    roundMe(number){
        return Math.round(number * 100)/100
    },

    formatInteger(integer){

    },
    dollarFormat(number){
        const integer = Math.floor(number)
        const intStr = integer.toString().split("").reverse().join("")
        const my_arr = intStr.match(/.{1,3}/g)
        const new_arr = my_arr.map(piece=>{
            return piece.split("").reverse().join('')
        })
        const final_string = new_arr.reverse().join(",")
        
        const decimal = this.roundMe(number-integer)
        const decimal_string = decimal.toString().split(".")

        return `$${final_string}${decimal>0?`.${decimal_string[1]}`:""}`
    }
}

export default NumberService