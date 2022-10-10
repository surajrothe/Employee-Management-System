var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Pasword is password';

const fetchuser = (req, res, next) => {
    //Fetching user from jwt token and adding id tu request
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please Authenticate Using Valid Token!"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "Please Authenticate Using Valid Token!"});
    }
    
}
module.exports = fetchuser;