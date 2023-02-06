const express=require("express")
const { authenticate } = require("../middleware/authenticate")
const {Goldmodel}=require("../modals/goldModal")
const {authorisation}=require("../middleware/authorise")
const goldRouter=express.Router()



// goldRouter.get("/alldata",async(req,res)=>{
//     try {
//         const result=Goldmodel.find()
//         res.send(result)
//     } catch (err) {
//         console.log(err);
//         console.log("Something went wrong")
//     }
// })

// goldRouter.post("/create",async(req,res)=>{
//     const body=req.body
//     try {
//         const result=new Goldmodel(body)
//         await result.save()
//         res.send("data created")
//     } catch (err) {
//         console.log(err);
//         console.log("Something went wrong")
//     }
// })

// goldRouter.get("/",(req,res)=>{
//     res.send("Hii")
// })


goldRouter.get("/goldrate",authenticate,(req,res)=>{
    res.send("Gold rate")
})
goldRouter.get("/userStatus" ,authenticate,authorisation(["manager"]),(req,res)=>{
    res.send("UserStatus")
})


module.exports={goldRouter}