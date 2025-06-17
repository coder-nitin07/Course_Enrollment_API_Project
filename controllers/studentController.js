// POST /student/onboard             (register or setup student profile)
// GET  /student/courses             (get all courses student enrolled in)
// GET  /student/profile             (get logged-in student's profile)       [optional]
// PUT  /student/profile             (update student's profile)             [optional]

const prisma = require("../config/prisma");


// POST /enroll/:courseId            (enroll in a course)
// DELETE /unenroll/:courseId        (unenroll/leave a course)

// Create Student
const onboardStudent = async (req, res)=>{
    try {
        const studentId = req.user.userId;

        const existingStudent = await prisma.studentProfile.findUnique({ where: { userId: studentId } });
        if(existingStudent){
            return res.status(400).json({ message: 'Student Already exist' });
        }

        const { mobile, qualification, age, profilePicture, preferredLanguage } = req.body;

        const studentProfile = await prisma.studentProfile.create({
            data: {
                userId: studentId,
                mobile,
                qualification,
                age,
                profilePicture,
                preferredLanguage
            }
        });

        res.status(201).json({ message: 'Student Profile Created Successfully', profile: studentProfile });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Student Profile
const getStudentProfile = async (req, res)=>{
    try {
        const studentId = req.user.userId;

        const studentProfile = await prisma.studentProfile.findUnique({ where:{ userId: studentId } });
        if(!studentProfile){
            return res.status(403).json({ message: 'Student not exist' });
        }

        res.status(200).json({ message: 'Student Profile Succesfully Fetched', profile: studentProfile }) ;
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update Student Profile
const updateStudent = async (req, res)=>{
    try {
        const student = req.user.userId;

        const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: student } });
        if(!studentProfile){
            return res.status(404).json({ message: 'Profile not found' }); 
        }

        const { mobile, age, qualification, preferredLanguage } = req.body;

        const updatedProfile = await prisma.studentProfile.update({ 
            where: { userId: student },
            data: {
                mobile,
                age,
                qualification,
                preferredLanguage
            }
        });

        res.status(200).json({ message: 'Details Updated Successfully', profile: updatedProfile });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardStudent, updateStudent, getStudentProfile };