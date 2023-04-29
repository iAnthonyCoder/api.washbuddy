// const mongoose = require('mongoose');
const Permissions = require('./seeders/permissions.seeder');
const Roles = require('./seeders/roles.seeder');
const Users = require('./seeders/users.seeder');

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = {
    Permissions,
    Roles,
    Users,
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
// const connect = async () => await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
exports.connect = require('./database/index');

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */


