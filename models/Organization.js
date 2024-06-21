const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    organization_name: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Organization', OrganizationSchema);
