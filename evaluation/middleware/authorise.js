//outerfunction//
const authorisation=(role_array)=>{
    //inner function//
    return(req,res,next)=>{
       const userrole=req.body.userrole;
      //  console.log(userrole)
      if(role_array.includes(userrole)){
        next()
      }else{
        res.send("Your are not authorised")
      }
    }
    
}


module.exports={authorisation}