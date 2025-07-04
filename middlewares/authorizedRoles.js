
// Authorized Roles
const authorizedRoles = (allowedRoles)=>{
    return (req, res, next)=>{
        try {
            const { userRole } = req.user;

            if(!userRole){
                return res.status(403).json({ message: 'Role is required.' });
            }

            const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [ allowedRoles ];

            if(!rolesArray.includes(userRole)){
                return res.status(404).json({ message: 'You are not authorized for this role.' });
            }

            next();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong' });
        }
    };
};

module.exports = authorizedRoles;