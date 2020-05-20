const jwt=require('jsonwebtoken');

module.exports.verifyJwtToken = (req,res,next) => {
    var token;
    if('authorization' in req.headers)
        token=req.headers['authorization'].split(' ')[1];
        
    if(!token){
        console.log('No token');
        return res.status(403).send({auth: false,message: 'No token Provided'});
    }
    else{
        console.log(token);
        jwt.verify(token, "SECRET#123",
            (err,decoded) => {
                if(err){
                    return res.status(500).send({auth: false,message: 'Token Authentication failed'});
                }
                else{
                    req._id=decoded._id;
                    next();
                }
            } 
        )
    }
}