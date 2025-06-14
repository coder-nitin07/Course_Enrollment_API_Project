const prisma = require("../config/prisma");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Route
const register = async (req, res)=>{
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if(existingUser){
            return res.status(400).json({ message: 'Unable to create account with provided details.' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
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

// Login Route
const login = async (req, res)=>{
    try {
        const { email, password }= req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if(!user){
            return res.status(400).json({ message: 'Email or Password are incorrect.' })
        }

        const hashPassword = await bcrypt.compare(password, user.password);
        if(!hashPassword){
            return res.status(400).json({ message: 'Email or Password are incorrect.' });
        }
        console.log(user);
        const token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'User Login Successfully.', user: { id: user.id, email: user.email, role: user.role }, token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Logout Route
const logout = async(req, res)=>{
    try {
        const expirationToken = new Date(req.decoded.exp * 1000);
         
        await prisma.blacklistedToken.create({
            data: {
                token: req.token,
                expiresAt: expirationToken
            }
        });

        return res.status(200).json({ message: 'Logged Out Successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });   
    }
};

module.exports = { register, login, logout };