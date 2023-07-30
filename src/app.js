const express = require( 'express' ) 
const app =express(); 
const port = process.env.PORT || 3000
const path = require('path')

const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.set('view engine', 'hbs');

const viewDirctory = path.join(__dirname , '../temp/views')
app.set('views' , viewDirctory)

const hbs = require('hbs')
const partialsPath = path.join(__dirname , '../temp/partials')
hbs.registerPartials(partialsPath);


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to Home Page'
    });
});

const {forecast ,name} = require ('../data/forecast')
const geocode = require('../data/geocode.js')
const country = process.argv[2]

geocode(country , (error , data_g) =>{
    console.log('ERROR  : ' , error);
    console.log('DATA  : ' , data_g);

if(data_g)
{
    forecast(data_g.latitude ,  data_g.longtitude  , (error , data_f) =>{
        console.log('ERROR  : ' + error);
        console.log('DATA  : ' + data_f);
            app.get('/checkwheather' , (req , res) =>{
    res.render('checkWheather' , {
        latitude : data_g.latitude, 
        longtitude :  data_g.longtitude ,
        country :   country ,
        name : data_f.name ,
        text :  data_f.text ,
        temp :  data_f.temp ,
    }
    )
})
    })

}

})




app.listen(port, ()=>{
    console.log(`server running on ${port}`) 
        } )
