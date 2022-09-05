const express = require('express');
const app = express.Router();
const api = require('../controller/api');
const {signup, login, create_course} = require('../middleware/formvalidation');
const verifyLogin = require('../middleware/verifylogin');

app.get('/', api.index);
app.post('/user/sign_up', signup, api.sign_up);
app.post('/user/login', login, api.login);
app.get('/user/logout', api.logout);

//Admin Routes
app.post('/admin/create_course', create_course, verifyLogin.verifyToken, api.create_course);
app.patch('/admin/update_course', verifyLogin.verifyToken, api.update_course);
app.delete('/admin/delete_course', verifyLogin.verifyToken, api.delete_course);
app.post('/admin/add_Topic', verifyLogin.verifyToken, api.add_Topic);
app.patch('/admin/update_Topic', verifyLogin.verifyToken, api.Update_Topic);
app.delete('/admin/delete_Topic', verifyLogin.verifyToken, api.Delete_Topic);

//Super Admin Routes
app.post('/superadmin/approve_course', verifyLogin.verifyToken, api.approve_course);

//Employee Routes
app.get('/employee/approved_courses', verifyLogin.verifyToken, api.approved_courses);
app.get('/employee/play_topic/:topic_id', verifyLogin.verifyToken, api.play_topic);
app.post('/employee/update_course_progress', verifyLogin.verifyToken, api.update_course_progress);
app.get('/employee/increment_reward_points', verifyLogin.verifyToken, api.increment_reward_points);

module.exports = app