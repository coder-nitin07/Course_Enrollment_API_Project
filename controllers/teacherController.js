// POST /teacher/onboard (register or setup teacher profile)
// GET /teacher/courses (get all teacher's courses)
// POST /teacher/course (create a course)
// PUT /teacher/course/:id (update course)
// DELETE /teacher/course/:id (delete course)

const prisma = require("../config/prisma");

// Create Teacher
const onboardTeacher = async (req, res)=>{
    try {
        const teacherId = req.user.userId;

        const existingTeacher = await prisma.teacherProfile.findUnique({ where: { userId: teacherId } });
        if(existingTeacher){
            return res.status(400).json({ message: 'Teacher already exist' });
        }

        const { bio, expertise, experience, linkedin } = req.body;

        const teacherProfile = await prisma.teacherProfile.create({ 
            data: {
                userId: teacherId,
                bio,
                expertise,
                experience,
                linkedin
            }
         })

         res.status(201).json({ message: 'Teacher Profile Created', profile: teacherProfile });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Create course for the students by Teacher
const createCourse = async (req, res)=>{
    try {
        const teacher = req.user.userId;

        const getTeacher = await prisma.teacherProfile.findUnique({ where: { userId: teacher } });
        if(!getTeacher){
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const { title, description } = req.body;
        const course = await prisma.course.create({
            data: {
                title,
                description,
                teacherId: teacher
            }
        });

        res.status(201).json({ message: 'New Course Created', course });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardTeacher, createCourse };