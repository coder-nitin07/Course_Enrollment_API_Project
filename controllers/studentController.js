const prisma = require("../config/prisma");

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

// Enroll the student
const enrollStudent = async (req, res)=>{
    try {
        const studentId = req.user.userId;
        const courseId = parseInt(req.params.courseId);

        if(isNaN(courseId)){
            return res.status(404).json({ message: 'Invalid course Id.' })
        }

        const course = await prisma.course.findUnique({ where : { id: courseId } });
        if(!course){
            return res.status(404).json({ message: 'Course not found' });
        }

        const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: studentId } });
        if(!studentProfile){
            return res.status(404).json({ message: 'Student Profile not found' });
        }

        const existingEnrollment = await prisma.enrollment.findUnique({
            where: { 
                studentId_courseId: {
                    studentId,
                    courseId,
                },
             },
        });
        if(existingEnrollment){
            return res.status(409).json({ message: 'Already enrolled in this course' });
        }

        // Enrollment
        const enrollment = await prisma.enrollment.create({ 
            data: {
                studentId,
                courseId
            }
         })

        res.status(200).json({ message: 'Student enroll successfully', course: enrollment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Enrolled Course
const getAllEnrolledCourse = async (req, res)=>{
    try {
        const studentId = req.user.userId;

        const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId: studentId }
        });

        if(!studentProfile){
            return res.status(404).json({ messsage: 'Student Profile not found' });
        }

        const getAllEnrollCouses = await prisma.enrollment.findMany({
            where: { studentId },
            include: {  
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        teacher: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if(getAllEnrollCouses.length == 0){
            return res.status(404).json({ message: 'Not Courses found' });
        }

        res.status(200).json({ message: 'Successfully Fetched All Enroll Courses', courses: getAllEnrollCouses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Unenrolled form the Course
const unerollStudent = async (req, res)=>{
    try {
        const studentId = req.user.userId;
        const courseId = parseInt(req.params.courseId);

        if(!courseId){
            return res.status(400).json({ message: 'Course ID is required' });
        }

        await prisma.enrollment.delete({ 
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            }
        });

        res.status(200).json({ message: 'Unenrolled from the course successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardStudent, updateStudent, getStudentProfile, enrollStudent, getAllEnrolledCourse, unerollStudent };