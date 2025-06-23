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
        console.log(req.user, "Ddddf")
        console.log(teacher, "s")
        const getTeacher = await prisma.teacherProfile.findUnique({ where: { userId: teacher } });
        console.log(getTeacher)
        if(!getTeacher){
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const { title, description, minAge, qualificationId } = req.body;
        const course = await prisma.course.create({
            data: {
                title,
                description,
                minAge,
                qualificationId,
                teacherId: teacher
            }
        });

        res.status(201).json({ message: 'New Course Created', course });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update Course details
const updateCourse = async (req, res)=>{
    try {
        const teacher = req.user.userId;
        const id = Number(req.params.id);
        
        const existingCourse = await prisma.course.findUnique({ where: { id } }); 
        if(!existingCourse){
            return res.status(400).json({ message: 'Course not foumd' });
        }

        if (existingCourse.teacherId !== teacher) {
            return res.status(403).json({ message: 'You are not authorized to update this course, You can only Update your own courses.' });
        }


        const { title, description, qualificationId, minAge } = req.body;

        const updatedCourse = await prisma.course.update({
            where: { id: Number(id) },
            data: { 
                title, 
                description, 
                minAge,
                qualifications: {
                    connect: { id: qualificationId }
                }

             }
        });

        res.status(200).json({ message: 'Course Updated Successfully', course: updatedCourse });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete Course
const deleteCourse = async (req, res)=>{
    try {
        const teacher = req.user.userId;
        const id = Number(req.params.id);

        const existingCourse = await prisma.course.findUnique({ where: { id } }); 
        if(!existingCourse){
            return res.status(404).json({ message: 'Course not found' });
        }

        if (existingCourse.teacherId !== teacher) {
            return res.status(403).json({ message: 'You are not authorized to update this course, You can only Delete your own courses.' });
        }

        const deletedCourse = await prisma.course.delete({ where: { id } });
        res.status(200).json({ message: 'Course Deleted Successfully', course: deletedCourse });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All course of a Teacher
const getAllCourseOfTeacher = async (req, res)=>{
    try {
        const { teacherId } = req.params;

        const getAllCourse = await prisma.course.findMany({
            where: { teacherId: Number(teacherId) },
            include: {
                qualification: {
                select: { name: true, level: true }
                }
            }
        });

        if(getAllCourse.length === 0){
            return res.status(404).json({ message: 'No Course found' });
        }
        
        res.status(200).json({ message: "Get All Course", courses: getAllCourse });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All courses
const getAllCourse = async (req, res)=>{
    try {
        const getCourses = await prisma.course.findMany({
              select: {
                id: true,
                title: true,
                description: true,
                minAge: true,
                teacherId: true,
                teacher: {
                    select: {
                        name: true,
                        teacherProfile: {
                            select: {
                                bio: true,
                                expertise: true,
                                linkedin: true
                            }
                        }
                    }
                }
            }
        });

        res.status(200).json({ message: 'All courses fetched Successfully', courses: getCourses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Unenroll the Student
const unenrollStudent = async (req, res)=>{
    try {
        const teacher = req.user.userId;
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

        if(existingCourse.teacherId !== teacher){
            return res.status(403).json({ message: 'You are not authorized for this role.' });
        }

        const deletedStudent = await prisma.enrollment.delete({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId
                }
            }
        });

        const studentUser = await prisma.user.findUnique({
            where: { id: studentId },
            select: { id: true, name: true }
        });

        res.status(200).json({ message: 'Student unerolled from the course successfully', student: studentUser  });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardTeacher, createCourse, updateCourse, deleteCourse, getAllCourseOfTeacher, getAllCourse, unenrollStudent };