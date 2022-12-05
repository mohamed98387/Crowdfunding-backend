const jwt = require("jsonwebtoken")
const jwtSecret = "secret"




module.exports = function(req, res , next){
    //get token from header
    const token = req.header('x-auth-token')
    //check if token exists
    if(!token){
      return  res.json({
            msg:"No token , acces denied!!"
        })
    }
    jwt.verify(token,jwtSecret,(err,decoded)=>{
        if (err){
               res.json({
                msg:"token not valid!!"
            })
        }

        req.user = decoded.user
        next()
    })

}