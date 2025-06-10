const { Prisma } = require("../config/prisma");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Route
const register = async (req, res)=>{
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await Prisma.user.findUnique({ where: { email } });
        if(existingUser){
            return res.status(400).json({ message: 'Unable to create account with provided details.' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await Prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                role
            }
        })

        const token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User Registered Successfully', user: token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register };