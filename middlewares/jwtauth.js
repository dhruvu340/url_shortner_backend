const jwt =require('jsonwebtoken');

const jwtauthmd=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token)return res.status(401).json({msg:'No token provided'});
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'error'});
        
        
    }

}



const gentoken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'24h'});
}

module.exports={
    jwtauthmd,gentoken,
}