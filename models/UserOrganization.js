const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOrganizationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

module.exports = mongoose.model("UserOrganization", UserOrganizationSchema);
