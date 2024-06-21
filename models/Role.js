const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role_name: { type: String, required: true },
    privileges: { type: [String], required: true }
});

module.exports = mongoose.model('Role', RoleSchema);
