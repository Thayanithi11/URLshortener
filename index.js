const express=require("express");
const urlRoute=require('./routes/url')
const staticRoute=require('./routes/staticRouter')
const path=require('path')
const {connect}=require('./connection')
const {URL}=require('./models/url')
const {handleRedirectToUrl,handleGetAnalytics}=require('./controllers/url')
const app=express()
const PORT=8001

connect('mongodb://localhost:27017/short-url')
.then(()=>{
    console.log("Successfully Connected to the DataBase")
})

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/url",urlRoute)
app.use('/',staticRoute)
app.get('/url/:x',handleRedirectToUrl)
app.get('/analytics/:shortId',handleGetAnalytics)


app.listen(PORT,()=>{
    console.log("Server Listening to PORT number:",PORT)
})