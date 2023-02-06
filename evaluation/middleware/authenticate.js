const jwt=require("jsonwebtoken")
const fs=require("fs")
const cookieParser=require("cookie-parser")
const authenticate=(req,res,next)=>{
    const token=req.cookies.token;
    // console.log(token)
    if(!token){
        res.send("Please Login again first")
    }else{
      const blacklistdata=JSON.parse(fs.readFileSync("./blacklistdata.json","utf-8"))
      if(blacklistdata.includes(token)){
        return res.send("Your are loged out Pleas login first")
      }else{
        try {
            const decode=jwt.verify(token,"masai");
                if(decode){
                    const userRole=decode.role
                    req.body.userrole=userRole
                    // console.log(userRole)
                    const userID=decode.userID
                    req.body.userID=userID
                    // console.log(userID)
                    next()
        
                }else{
                    res.json("Please login Again")
                } 
        } catch (err) {
            res.send({"err":err.message})
        } 
    }
}
}


module.exports={authenticate}