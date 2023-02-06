const express=require("express");
const {connection}=require("./config/db")
const {userRouter}=require("./routes/userRoutes")
const cookieParser=require("cookie-parser")
const {goldRouter}=require("./routes/goldRoutes")
require("dotenv").config()
const app=express()
app.use(cookieParser())
app.use(express.json())

app.use("/user",userRouter)
app.use("/gold",goldRouter)

app.listen((process.env.port),async()=>{
    try {
        await connection;
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
        console.log("Something went wrong")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})