const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task_name: { type: String, required: true },
    description: { type: String, required: true },
    organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
