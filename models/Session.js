const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  current_organization_id: { type: Schema.Types.ObjectId, ref: "Organization" },
  login_time: { type: Date, required: true },
  last_access_time: { type: Date, required: true },
});

module.exports = mongoose.model("Session", SessionSchema);
