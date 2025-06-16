const express = require('express');
const { authRouter } = require('./routes/authRoutes');
const { teacherRouter } = require('./routes/teacherRoutes');
const app = express();
require('dotenv').config();

app.use(express.json());

// routes
app.use('/auth', authRouter);
app.use('/teacher', teacherRouter);

app.get('/', (req, res)=>{
    res.send('Course Management API Proejct...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})