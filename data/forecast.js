const request =require('request')

const forecast = (latitude , longtitude , callback) =>{
    const url = `http://api.weatherapi.com/v1/current.json?key=1ac9cae75d8545fb87d190813231907&q=${latitude},${longtitude}`; 
    request({url , json : true} ,(error , response )=>{
        if(error)
        {
            callback('unable to find geocode servise ' ,undefined );   
        }
        else if(response.body.error)
        {
            callback(response.body.error.message , undefined)
        } 
        else{
            const name  = response.body.location.name 
            const text =  response.body.current.condition.text 
            const temp =  response.body.current.temp_c
            callback (undefined , {
                name  : name,
                text :  text , 
                temp :  temp});
        }
})

} 

module.exports =  {
    forecast ,    
}

