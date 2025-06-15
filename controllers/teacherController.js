// POST /teacher/onboard (register or setup teacher profile)
// GET /teacher/courses (get all teacher's courses)
// POST /teacher/course (create a course)
// PUT /teacher/course/:id (update course)
// DELETE /teacher/course/:id (delete course)

// Create Teacher
const onboardTeacher = async (req, res)=>{
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardTeacher };