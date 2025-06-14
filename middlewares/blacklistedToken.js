const prisma = require("../config/prisma");
const jwt = require('jsonwebtoken');

// Check Blacklisted
const blacklistedToken = async (req, res, next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'No Token Provided.' });
    }

    try {
        const isBlacklistToken = await prisma.blacklistedToken.findUnique({
            where: { token }
        });
        
        console.log("s", isBlacklistToken)
        if(isBlacklistToken){
            return res.status(400).json({ message: 'Token Already Blacklisted. Please login again.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.decoded = decoded;
        req.token = token;

        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Token Already Blacklisted' });
    }
};

module.exports = blacklistedToken;