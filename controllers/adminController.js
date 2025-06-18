// 1. GET /admin/users – Get all users (teachers & students)
// 2. PUT /admin/user/:id/activate – Activate a user account
// 3. PUT /admin/user/:id/deactivate – Deactivate (suspend) a user account
// 4. PUT /admin/user/:id/role – Change user role (e.g., student → teacher)
// 5. DELETE /admin/user/:id – Delete a user

const prisma = require("../config/prisma");


// Add Qualification API
const addQualification = async (req, res)=>{
    try {
        const qualificationName = req.user.s;
        const id = req.user.id;

        console.log(req.user);
        const { name, level } = req.body;

        if(!name || !level){
            return res.status(400).json({ message: 'Please provide all the required fields.' });
        }

        const addNewQualification = await prisma.qualification.create({
            data: {
                name,
                level
            }
        });

        res.status(200).json({ message: 'Qualification Added Successfully', qulification: addNewQualification });
    } catch (err) {
        console.log(err);
        res.status(201).json({ message: 'Something went wrong' });
    }
};

// Get All Qualification
const getAllQualification = async (req, res)=>{
    try {
        const getQualifications = await prisma.qualification.findMany();

        res.status(200).json({ message: 'All Qualifications Fetched', qualifications: getQualifications });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { addQualification, getAllQualification };