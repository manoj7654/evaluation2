const express=require("express")
const {Usermodel}=require("../evaluation/modals/userModal")
const userRouter=express.Router()
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const fs=require("fs")

userRouter.get("/",(req,res)=>{
    res.send("heloo")
})
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,role}=req.body;

    try {
        bcrypt.hash(password, 5, async function(err, secure_password) {
           if(err){
            console.log(err)
           }else{
            const user=new Usermodel({name,email,password:secure_password,role})
            await user.save()
            res.send("User Registration Successful")
           }
        });
        
    } catch (err) {
        console.log(err);
        console.log("Something went wrong")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user= await Usermodel.find({email});
        bcrypt.compare(password, user[0].password, (err, result)=> {
            if(result){
                const token=jwt.sign({userID:user[0]._id,role:user[0].role},process.env.key,{expiresIn:60})
                const refresh_token=jwt.sign({userID:user[0]._id,role:user[0].role},process.env.key2,{expiresIn:300})
                res.cookie("token",token),
                res.cookie("refresh_token",refresh_token)
                res.send("User Login Success")
            }else{
                console.log("wrong credential")
            }
        });
    } catch (err) {
        console.log(err);
        console.log("Something went wrong")
        
    }
})

userRouter.get("/logout",(req,res)=>{
    token=req.cookies.token;
    const blacklistdata=JSON.parse(fs.readFileSync("./blacklistdata.json","utf-8"));
    blacklistdata.push(token)
    fs.writeFileSync("./blacklistdata.json",JSON.stringify(blacklistdata))
    res.json("Log out success")
})

userRouter.get("/getnewtoken",(req,res)=>{
    const refresh_token=req.cookies.refresh_token;
    if(!refresh_token){
        res.send("Your token expired please login again")
    }
    jwt.verify(refresh_token,process.env.key2,(err,decode)=>{
        if(err){
            res.send({"err":err.message,"message":"please login first"})
        }else{
            const token=jwt.sign({userID:decode.userId},process.env.key,{expiresIn:60})
            res.cookie("token",token)
            res.send("Login success")
        }
    })
})

module.exports={userRouter}