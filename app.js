const express = require('express')
const app = express()
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const mongoose = require('mongoose')
const Datee = require('./models/models');
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',async (req,res) =>{
    let date = new Date()
    let all = await Datee.find({})
    res.render('templates/index',{"all_about_date":new Date(),"date":date.getDate(),"all":all})
});

app.get('/mycalender',async (req,res) =>{
    let all = await Datee.find({})
    res.render('templates/calender',{"all_about_date":new Date(),"all":all})
})

app.post('/',async (req,res)=>{
    try{
        let data = new Datee(req.body)
        console.log(req.body);
        await data.save()
        res.send({"message":"success"})
        console.log('done');
    }catch(e){
        res.redirect("/")
        console.log(e)
    }
})

app.listen(PORT,()=>{console.log('App Running on Port 3000');})