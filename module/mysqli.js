module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['insert_user'] = "INSERT INTO `userdb` (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";
mysqliq['check_user'] = "SELECT * FROM `userdb` WHERE `email` = ?";
mysqliq['login'] = "SELECT * FROM `userdb` WHERE `email` = ? AND `password` = ?";

//Admin queries
mysqliq['create_course'] = "INSERT INTO `courses` (`admin_id`, `title`, `description`, `video_url`, `duration`, `category`) VALUES (?, ?, ?, ?, ?, ?)";
mysqliq['get_courses'] = "SELECT * FROM `courses`";
mysqliq['update_course'] = "UPDATE `courses` SET `title` = ?, `description` = ?, `video_url` = ?, `duration` = ?, `category` = ? WHERE `course_id` = ?";
mysqliq['delete_course'] = "DELETE FROM `courses` WHERE `course_id` = ?";

mysqliq['create_topic'] = "INSERT INTO `course_topics` (`course_id`, `topic_name`) VALUES (?, ?)";
mysqliq['insert_topic'] = "INSERT INTO `course_topics` (`course_id`, `topic_name`, `video_url`, `pdf_url`, `quizzes_url`) VALUES (?, ?, ?, ?, ?)";
mysqliq['update_topic'] = "UPDATE `course_topics` SET `topic_name` = ?, `video_url` = ?, `pdf_url` = ?, `quizzes_url` = ? WHERE `topic_id` = ?";
mysqliq['delete_topic'] = "DELETE FROM `course_topics` WHERE `topic_id` = ?";
mysqliq['get_topics'] = "SELECT * FROM `course_topics` WHERE `course_id` = ?";

//super admin queries
mysqliq['approve_course'] = "UPDATE `courses` SET `approval_status` = ? WHERE `course_id` = ?";

//Employee queries
mysqliq['approved_courses'] = "SELECT * FROM courses WHERE courses.approval_status = 'approved' ORDER BY category";
mysqliq['play_topic'] = "INSERT INTO `course_progress` (`topic_id`, `Employee_id`) VALUES (?, ?)";
mysqliq['update_course_progress'] = "UPDATE `course_progress` SET `topic_status` = ?, `course_status` = ? WHERE `topic_id` = ? AND `Employee_id` = ?";
mysqliq['increment_reward_points'] = "UPDATE `userdb` SET `reward_points` = `reward_points` + 1 WHERE `user_id` = ?";
