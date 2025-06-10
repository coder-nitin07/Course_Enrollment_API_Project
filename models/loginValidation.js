const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required()
});

const loginValidation = (req, res, next)=>{
    const { error } = loginSchema.validate(req.body);

    if(error){
        console.log(error, "S")
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { loginValidation };