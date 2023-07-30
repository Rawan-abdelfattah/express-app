const request = require('request')
const geocode =  (address , callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw'
    
    request({url  , json : true} ,(error , response )=>{
            if(error)
            {
                callback('unable to find geocode servise ' , undefined);   
            }
            else if(response.body.message)
            {
                callback(response.body.message , undefined)
            } 
            else if(response.body.features.length == 0 )
            {
                callback('unable to find location' , undefined)
            }
            else{
                const longtitude = response.body.features[0].center[0]
                const latitude =  response.body.features[0].center[1]
                callback(undefined , { 
                    latitude : latitude,
                    longtitude : longtitude 
                    });
            }
    })
    }

    module.exports = geocode ; 
    