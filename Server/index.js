const express=require("express")
const app=express()
const cors=require("cors")
const mongoose = require("mongoose")
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs=require("fs")
const cookieParser=require("cookie-parser")
const userRouter=require("./routes/users.js")
const {tournsRouter}=require("./routes/tourns.js")
const newsRouter=require("./routes/news.js")
const teamsRouter=require("./routes/teams.js")
const playersRouter=require("./routes/player.js")
const matchesRouter=require("./routes/match.js")
const searchRouter=require("./routes/search.js")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

app.use("/api/user",userRouter)
app.use("/api/tourns",tournsRouter)
app.use("/api/news",newsRouter)
app.use("/api/teams",teamsRouter)
app.use("/api/player",playersRouter)
app.use("/api/match",matchesRouter)
app.use("/api/search",searchRouter)


const CONNECTION_STRING="mongodb+srv://karimahmad2172:rxTs3xKKmjHWyTfM@cluster0.bdsyg.mongodb.net/FootBallCenter?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(CONNECTION_STRING)
    .then(() => console.log('Connected to footballCenter database'))
    .catch(err => console.error('Failed to connect to database:', err));
app.get("/api/countries",(req,res)=>{
    res.json(countriesData)
})

app.get("/api/profile",(req,res)=>{
    let user=req.authenticated
    res.json({auth:user})
})

app.listen(5000,()=>{
    console.log("Server is listening on Port 5000.....")
})
