var express = require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/moneylist')
var db= mongoose.connection
db.on('error',()=>{
    console.log("Error in connecting database")
})
db.once('open',()=>console.log("connected to database"))

app.post("/add",(req,res)=>{
    var category_select = req.body.category_select
    var amount_input = req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "Category":category_select,
        "Amount": amount_input,
        "Info": info,
        "Data":date_input
}
db.collection('users').insertOne(data,(err,collection) =>{
  
    if(err){
        throw err;

    }
    console.log("Record inserted successfully")
})

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(5000)

console.log("Listening on port 5000")
