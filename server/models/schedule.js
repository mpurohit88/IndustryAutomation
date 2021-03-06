const connection = require("../lib/connection.js");

const Schedule = function (params) {
    this.name = params.name,
        this.task_id = params.task_id,
        this.scheduleId = params.scheduleId,
        this.company_id = params.company_id,
        this.subject = params.subject,
        this.message_body = params.message_body,
        this.next_reminder_date = params.next_reminder_date,
        this.from_address = params.from_address,
        this.to_address = params.to_address,
        this.cc_address = params.cc_address,
        this.bcc_address = params.bcc_address,
        this.attachments = params.attachments,
        this.frequency = params.frequency,
        this.time = params.time,
        this.createdBy = params.createdBy,
        this.is_reminder = params.is_reminder,
        this.is_payment_reminder = params.is_payment_reminder,
        this.isActive = 1
};

Schedule.prototype.add = function () {

    const that = this;
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (error, connection) {
            if (error) {
                throw error;
            }

            let values = [
                [that.task_id, that.company_id, that.subject, that.next_reminder_date, that.message_body, that.from_address, that.to_address, that.cc_address, that.bcc_address, that.attachments, that.frequency, that.time, that.is_reminder, that.is_payment_reminder, that.isActive, that.createdBy]
            ]

            connection.query("INSERT INTO schedule(task_id,company_id,subject,next_reminder_date,message_body,from_address,to_address,cc_address,bcc_address,attachment,frequency,time,is_reminder,is_payment_reminder,isActive,createdBy) VALUES ?", [values], function (error, rows, fields) {
                if (!error) {
                    resolve(rows);
                } else {
                    console.log("Error...", error);
                    reject(error);
                }

                connection.release();
                console.log('Process Complete %d', connection.threadId);
            });
        });
    });
};

Schedule.prototype.update = function () {
    const that = this;

    return new Promise(function (resolve, reject) {
        connection.getConnection(function (error, connection) {
            if (error) {
                throw error;
            }

            let values = [that.from_address, that.to_address, that.cc_address, that.bcc_address, that.next_reminder_date, that.frequency, that.time, that.scheduleId];

            connection.query("Update schedule set from_address = ?,to_address = ?, cc_address = ?, bcc_address = ?,next_reminder_date = ?, frequency = ?,time = ? Where Id = ?", values, function (error, rows, fields) {
                if (!error) {
                    resolve(rows);
                } else {
                    console.log("Error...", error);
                    reject(error);
                }

                connection.release();
                console.log('Process Complete %d', connection.threadId);
            });
        });
    });
};

Schedule.prototype.getScheduleDetails = function (scheduleId) {
    const that = this;
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (error, connection) {
            if (error) {
                throw error;
            }

            connection.query("SELECT Frequency, next_reminder_date, Time, cc_address, bcc_address From Schedule WHERE id = ?", [scheduleId], function (error, rows, fields) {
                if (!error) {
                    resolve(rows);
                } else {
                    console.log("Error...", error);
                    reject(error);
                }

                connection.release();
                console.log('Process Complete %d', connection.threadId);
            });
        });
    });
};

Schedule.prototype.stop = function (scheduleId) {
    const that = this;
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (error, connection) {
            if (error) {
                throw error;
            }

            connection.query("Update schedule set isActive = 0 Where Id = ?", [scheduleId], function (error, rows, fields) {
                if (!error) {
                    resolve(rows);
                } else {
                    console.log("Error...", error);
                    reject(error);
                }

                connection.release();
                console.log('Process Complete %d', connection.threadId);
            });
        });
    });
};


Schedule.prototype.stopAll = function (quoteId) {
    const that = this;
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (error, connection) {
            if (error) {
                throw error;
            }

            connection.query("Update schedule set isActive = 0 Where task_id in (select id from activity_task_hist where userActivityId in (select id from user_activity where quoteId = ?))", [quoteId], function (error, rows, fields) {
                if (!error) {
                    resolve(rows);
                } else {
                    console.log("Error...", error);
                    reject(error);
                }

                connection.release();
                console.log('Process Complete %d', connection.threadId);
            });
        });
    });
};

module.exports = Schedule;