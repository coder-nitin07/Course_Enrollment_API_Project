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

        console.log(req.user, "dfsdkf");

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

module.exports = { onboardTeacher };