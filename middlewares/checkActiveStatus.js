
// Check Status of the User
const checkActieStatus = (req, res, next)=>{
    try {
        const { role, isActive } = req.user;

        if(role === 'TEACHER' || role === 'STUDENT'){
            if(isActive === false){
                return res.status(403).json({ message: 'Your account is suspended. Contact Again.' });
            }
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = checkActieStatus;