const jwt = require("jsonwebtoken");
const SECRET_KEY = "Sandhiya";

function AuthmiddleWare(req,res,next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith ("Bearer ")){
        return res.status(400).json({msg:"Invalid Access"})
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,SECRET_KEY);
        req.userId = decoded.id
        next();
        
}
catch {
    res.json(400).json({msg:"Invalid Access"})
}
}

module.exports = AuthmiddleWare;