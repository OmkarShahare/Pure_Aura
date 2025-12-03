const express= require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const app=express();
const adminRoutes=require("./adminRoutes")

dotenv.config({path:'./.env'});
const cors=require('cors');
const SpaUser = require('./model/userSchema');
require('./db/conn');

app.use(cors());  //enable cors for all routes
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.cookie("Test",'aniket');
    res.send('Hello at contact page');
})

app.post('/register',async(req,res)=>{
    const {custName,email,service,hands,date}=req.body;

    if(!custName || !email || !service || !hands || !date){
        return res.status(422).json({error:'please fill the fields'});
    }

    const spaUser=new SpaUser({custName,email,service,hands,date});
    await spaUser.save();
    res.status(201).json({message:'User registered successfully'});
})


app.use("/",adminRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});