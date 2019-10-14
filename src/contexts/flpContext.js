import React from 'react'

const FlpContext = React.createContext({
    clients:[
        {
            id:1,
            name:"Mundy Moon",
            email:"MundyMoon@gmail.com",
            phone:"555-9334-1234",
            currentPromo:"",
        },{
            id:2,
            name:"Debra Dewi",
            email:"DebraDewi@gmail.com",
            phone:"555-9134-1234",
            currentPromo:"Spring10",
        },{
            id:3,
            name:"Symbolic Cindy",
            email:"Symbolic Cindy@gmail.com",
            phone:"555-9334-1134",
            currentPromo:"Spring10",
        }
    ],
    sayHello:""
})

export default FlpContext

