// 1. GET /admin/users – Get all users (teachers & students)
// 2. PUT /admin/user/:id/activate – Activate a user account
// 3. PUT /admin/user/:id/deactivate – Deactivate (suspend) a user account
// 4. PUT /admin/user/:id/role – Change user role (e.g., student → teacher)
// 5. DELETE /admin/user/:id – Delete a user

const { Prisma } = require("@prisma/client");
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

// Update Qualification
const updateQualification = async (req, res)=>{
    try {
        const id = Number(req.params.id);
        const getQualification = await prisma.qualification.findUnique({ where : { id: id } });

        if(!getQualification){
            return res.status(400).json({ message: 'Qualification not found' });
        }

        const { name, level } = req.body;

        const updatedQualification = await prisma.qualification.update({
            where : { id: id },
            data:{
                name,
                level
            }
        });

        res.status(200).json({ message: 'Qualification Updated Successfully', qualification: updatedQualification });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete Qualification
const deleteQualification = async (req, res)=>{
    try {
        const id = Number(req.params.id);
        const getQualification = await prisma.qualification.findUnique({ where : { id: id } });

        if(!getQualification){
            return res.status(400).json({ message: 'Qualification not found' });
        }

        const deletedQualification = await prisma.qualification.delete({
            where: { id: getQualification.id }
        });

        res.status(200).json({ message: 'Qualification Deleted Successfully', qualification: deletedQualification });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
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

// Unenroll Student from any course
const unenrollStudentByAdmin = async (req, res)=>{
    try {
        const admin = req.user.userId;
        const { studentId, courseId } = req.body;

        if(!studentId || !courseId){
            return res.status(400).json({ message: 'Please filled all the required fields.' });
        }

        const existingCourse = await prisma.course.findUnique({ where: { id: courseId } });
        if(!existingCourse){
            return res.status(400).json({ message: 'Course not found' });
        }

        const existingStudent = await prisma.studentProfile.findUnique({ where: { userId: studentId } });
        if(!existingStudent){
            return res.status(400).json({ message: 'Student not found' });
        }

        const deletedStudent = await prisma.enrollment.delete({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            }
        });

        res.status(200).json({ message: 'Student Unenrolled from the course successfully', course: deletedStudent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {
            role,
            search = '',
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 10
        } = req.query;

        // Build filters
        const filters = {
            id: { not: userId } // Exclude current admin
        };

        if (role) {
            filters.role = role.toUpperCase();
        }

        if (search) {
            filters.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
            ];
        }

        const users = await prisma.user.findMany({
            where: filters,
            orderBy: {
                [sortBy]: order === 'asc' ? 'asc' : 'desc'
            },
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true
            }
        });

        const totalCount = await prisma.user.count({ where: filters });

        res.status(200).json({
            message: 'All Users Fetched',
            totalUsers: totalCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { addQualification, updateQualification, deleteQualification, getAllQualification, unenrollStudentByAdmin, getAllUsers };