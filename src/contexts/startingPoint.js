const StartingContext= {
    loggedIn:true,
    clients:[
        {
            id:1,
            name:"Mundy Moon",
            email:"MundyMoon@gmail.com",
            phone:"555-9334-1234",
            currentPromo:1,
            lastService:1,
            deleted:false
        },{
            id:2,
            name:"Debra Dewi",
            email:"DebraDewi@gmail.com",
            phone:"555-9134-1234",
            lastService:2,
            deleted:false
        },{
            id:3,
            name:"Symbolic Cindy",
            email:"Symbolic Cindy@gmail.com",
            phone:"555-9334-1134",
            currentPromo:3,
            lastService:3,
            deleted:false
        }
    ],
    promotions:[
        {
            id:1,
            name:"10-Spring2019",
            description:"take 10% off anything in Spring of 2019",
            deleted:false
        },
        {
            id:2,
            name:"5-Spring2019",
            description:"take 5% off anything in Spring 2019",
            deleted:false
        },
        {
            id:3,
            name:"25-SuperReferral",
            description:"Super referrals receive 25% off their next purchase",
            deleted:false
        }
    ],
    services:[
        {
            id:1,
            notes:"Hair and Makeup",
            cost:600,
            people:3,
            promotion_used:1,
            client_id:1,
            deleted:false
        },
        {
            id:2,
            notes:"Hair Wedding",
            cost:450,
            people:3,
            client_id:2,
            deleted:false
        },
        {
            id:3,
            notes:"Hair and Makeup Wedding",
            cost:1450,
            people:6,
            promotion_used:3,
            client_id:3,
            deleted:false
        },
        {
            id:4,
            notes:"Hair and Makeup Wedding",
            cost:1650,
            people:7,
            promotion_used:3,
            client_id:3,
            deleted:false
        },
    ],
    addClient:"",
    addService:"",
    deleteClient:"",
    deleteService:"",
    editClient:"",
    editService:"",
    logOut:"",
    logIn:""
}

export default StartingContext