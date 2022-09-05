const { json } = require('body-parser');
const { contentSecurityPolicy } = require('helmet');
const joi = require('joi');
const {jsonResponse} = require('../controller/commonController');


const signup_schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required(),
    role: joi.string().min(3).max(30).required()
});

const login_schema = joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required()
});

const course_schema = joi.object({
    title: joi.string().min(3).max(30).required(),
    description: joi.string().min(6).max(255).required(),
    video_url: joi.string().min(6).max(1024).required(),
    topics: joi.array().items(joi.string().min(3).max(100).required()).required(),
    duration: joi.string().min(3).max(30).required(),
    category: joi.string().min(3).max(30).required()
});

const validate = (schema, property, whichschema) => {
    return (req, res, next) => {
        //check which schema to use
        if(whichschema == 'course_schema'){
            req.body.topics = JSON.parse(req.body.topics);
        }

        const {error} = schema.validate(req[property]);
        const valid = error == null;
        if (valid) {
            if(whichschema == 'course_schema'){
                req.body.topics = JSON.stringify(req.body.topics);
            }
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            jsonResponse(res, "error", message);
            return;
        }
    }
}

module.exports = {
    signup: validate(signup_schema, 'body', 'signup'),
    login: validate(login_schema, 'body', 'login'),
    create_course: validate(course_schema, 'body', 'course_schema')
}