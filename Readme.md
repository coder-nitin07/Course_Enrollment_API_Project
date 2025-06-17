the code flow -

 So the correct test flow would be:
✅ Onboard teacher → /teacher/onboard

✅ Create courses → /teacher/course

✅ Onboard student → /student/onboard

✅ Call GET /student/courses to see all available courses

✅ Enroll in a course → POST /enroll/:courseId

✅ Unenroll (optional) → DELETE /unenroll/:courseId