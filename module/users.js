const mysqli = require('./mysqli');
const mysqliClass = new mysqli();

class Users {
    constructor() {}

    async getUsersDetails() {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, 'all_users');
        return await global.mysql.query(strQuery, escape_data);
    }
    async getUser(req) {
        let mysql = {};
        let escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'single_user');
        return await global.mysql.query(strQuery, escape_data);
    }
    async getUserByEmail(email) {
        let mysql = {};
        let escape_data = [email];
        let strQuery = await mysqliClass.mysqli(mysql, 'check_user');
        return await global.mysql.query(strQuery, escape_data);
    }

    async insertUser(req) {
        let mysql = {};
        let escape_data = [req.body.name, req.body.email, req.body.password, req.body.role];
        let strQuery = await mysqliClass.mysqli(mysql, 'insert_user');
        return await global.mysql.query(strQuery, escape_data);
    }

    async insertCourse(req) {
        let mysql = {};
        let escape_data = [req.user.id, req.body.title, req.body.description, req.body.video_url, req.body.duration, req.body.category];
        let strQuery = await mysqliClass.mysqli(mysql, 'create_course');
        return await global.mysql.query(strQuery, escape_data);
    }

    async insertTopic(course_id, topic, req) {
        let mysql = {};
        let escape_data = [course_id, topic];
        let strQuery = await mysqliClass.mysqli(mysql, 'create_topic');
        return await global.mysql.query(strQuery, escape_data);
    }

    async addTopic(req) {
        let mysql = {};
        let escape_data = [req.body.course_id, req.body.topic_name, req.body.video_url, req.body.pdf_url, req.body.quizzes_url];
        let strQuery = await mysqliClass.mysqli(mysql, 'insert_topic');
        return await global.mysql.query(strQuery, escape_data);
    }

    async updateCourse(req) {
        let mysql = {};
        let escape_data = [req.body.title, req.body.description, req.body.video_url, req.body.duration, req.body.category, req.body.course_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'update_course');
        return await global.mysql.query(strQuery, escape_data);
    }

    async deleteCourse(req) {
        let mysql = {};
        let escape_data = [req.body.course_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'delete_course');
        return await global.mysql.query(strQuery, escape_data);
    }

    async UpdateTopic(req) {
        let mysql = {};
        let escape_data = [req.body.topic_name, req.body.video_url, req.body.pdf_url, req.body.quizzes_url, req.body.topic_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'update_topic');
        return await global.mysql.query(strQuery, escape_data);
    }

    async deleteTopic(req) {
        let mysql = {};
        let escape_data = [req.body.topic_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'delete_topic');
        return await global.mysql.query(strQuery, escape_data);
    }

    async get_topics(course_id) {
        let mysql = {};
        let escape_data = [course_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_topics');
        return await global.mysql.query(strQuery, escape_data);
    }

    async approveCourse(req) {
        let mysql = {};
        let escape_data = [req.body.approval_status, req.body.course_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'approve_course');
        return await global.mysql.query(strQuery, escape_data);
    }

    async approvedCourses() {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, 'approved_courses');
        return await global.mysql.query(strQuery, escape_data);
    }

    async playTopic(req) {
        let mysql = {};
        let escape_data = [req.params.topic_id, req.user.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'play_topic');
        return await global.mysql.query(strQuery, escape_data);
    }

    async updateCourseProgress(req) {
        let mysql = {};
        let escape_data = [req.body.topic_status, req.body.course_status, req.body.topic_id, req.user.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'update_course_progress');
        return await global.mysql.query(strQuery, escape_data);
    }

    async incrementRewardPoints(req) {
        let mysql = {};
        let escape_data = [req.user.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'increment_reward_points');
        return await global.mysql.query(strQuery, escape_data);
    }

}

module.exports = Users;