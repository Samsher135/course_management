const {jsonResponse} = require("./commonController");
const usersModule = require('../module/users');
const users = new usersModule();
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
  
// Set up Global configuration access
dotenv.config();


module.exports = {
    index: (req, res) => {
        jsonResponse(res, 'success', 'Welcome to course management system');
    },

    users: async (req, res) => {
        try {
            let [results] = await Promise.all([users.getUsersDetails()])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    singleUser: async (req, res) => {
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.getUser(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    sign_up: async (req, res) => {
        try {
            // check if user already exists
            let [emailexist] = await Promise.all([users.getUserByEmail(req.body.email)])
            if (emailexist.length > 0) {
                jsonResponse(res, "error", "User already exists");
                return;
            }

            // hash password
            req.body.password = await bcrypt.hash(req.body.password, 10);

            // insert user
            let [results] = await Promise.all([users.insertUser(req)])

            //create jwt token
            let [insertedUser] = await Promise.all([users.getUserByEmail(req.body.email)])
            let data = {email: insertedUser[0].email, role: insertedUser[0].role, id: insertedUser[0].user_id};
            const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '6h'});

            res.cookie('token', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            jsonResponse(res, "sucess", {token: token, data: data});
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    login: async (req, res) => {
        try {
            // check if user already exists
            let [emailexist] = await Promise.all([users.getUserByEmail(req.body.email)])
            if (emailexist.length == 0) {
                jsonResponse(res, "error", "User does not exist please sign up");
                return;
            }

            // check password
            let hashedPassword = emailexist[0].password;
            let passwordIsValid = await bcrypt.compare(req.body.password, hashedPassword);
            if (!passwordIsValid) {
                jsonResponse(res, "error", "Invalid Password");
                return;
            }

            //create jwt token
            let data = {email: emailexist[0].email, role: emailexist[0].role, id: emailexist[0].user_id};
            const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '6h'});

            res.cookie('token', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            jsonResponse(res, "sucess", {token: token, data: data});
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('token');
            jsonResponse(res, "sucess", "Logged out successfully");
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    create_course: async (req, res) => {
        try {
            if(req.user.role === 'Admin' || req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.insertCourse(req)])
                let createdid = results.insertId;
                
                if(results.affectedRows > 0){
                    let topics = JSON.parse(req.body.topics);
                    //insert topics
                    for (let i = 0; i < topics.length; i++) {
                        let [topic] = await Promise.all([users.insertTopic(createdid, topics[i], req)])
                    }

                    jsonResponse(res, "sucess", {results: results, topics: topics});
                }
            }
            else{
                jsonResponse(res, "error", "You are not authorized to create course")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    update_course: async (req, res) => {
        try {
            if(req.user.role === 'Admin' || req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.updateCourse(req)])

                jsonResponse(res, "sucess", results);
            }
            else{
                jsonResponse(res, "error", "You are not authorized to update course")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    delete_course: async (req, res) => {
        try {
            if(req.user.role === 'Admin' || req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.deleteCourse(req)])

                jsonResponse(res, "sucess", results);
            }
            else{
                jsonResponse(res, "error", "You are not authorized to delete course")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    add_Topic: async (req, res) => {
        try {
            if(req.user.role === 'Admin' || req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.addTopic(req)])

                jsonResponse(res, "sucess", results);
            }
            else{
                jsonResponse(res, "error", "You are not authorized to add topic")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    Update_Topic: async (req, res) => {
        try {
            if(req.user.role === 'Admin' || req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.UpdateTopic(req)])

                jsonResponse(res, "sucess", results);
            }
            else{
                jsonResponse(res, "error", "You are not authorized to rename course")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    Delete_Topic: async (req, res) => {
        try {
            if(req.user.role === 'Admin' || req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.deleteTopic(req)])

                jsonResponse(res, "sucess", results);
            }
            else{
                jsonResponse(res, "error", "You are not authorized to delete topic")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    approve_course: async (req, res) => {
        try {
            if(req.user.role === 'Super Admin'){
                let [results] = await Promise.all([users.approveCourse(req)])

                jsonResponse(res, "sucess", results);
            }
            else{
                jsonResponse(res, "error", "You are not authorized to approve course")
            }

        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    approved_courses: async (req, res) => {
        try {
            let [results] = await Promise.all([users.approvedCourses(req)])
            for(let i = 0; i < results.length; i++){
                let [topics] = await Promise.all([users.get_topics(results[i].course_id)])
                //push topics to results
                results[i].topics = topics;
            }
            jsonResponse(res, "sucess", results);
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    play_topic: async (req, res) => {
        try {
            let [results] = await Promise.all([users.playTopic(req)])

            jsonResponse(res, "sucess", results);
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    update_course_progress: async (req, res) => {
        try {
            let [results] = await Promise.all([users.updateCourseProgress(req)])

            jsonResponse(res, "sucess", results);
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    increment_reward_points: async (req, res) => {
        try {
            let [results] = await Promise.all([users.incrementRewardPoints(req)])

            jsonResponse(res, "sucess", results);
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    }

}