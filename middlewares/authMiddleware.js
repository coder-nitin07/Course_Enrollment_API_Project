const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({ messsage: 'Token is missing. Please Login.' });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decode;  

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = authMiddleware;