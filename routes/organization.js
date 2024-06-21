const express = require("express");
const Organization = require("../models/Organization");
const UserOrganization = require("../models/UserOrganization");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a new organization
router.post("/organizations", auth, async (req, res) => {
  const { organization_name } = req.body;
  try {
    const organization = new Organization({
      organization_name,
      created_by: req.user.userId,
    });
    await organization.save();
    const userOrganization = new UserOrganization({
      user_id: req.user.userId,
      organization_id: organization._id,
    });
    await userOrganization.save();
    res.status(200).send("Organization created");
  } catch (err) {
    console.log("err :", err);
    res.status(500).send("Server error");
  }
});

// Get all organizations the user is part of
router.get("/organizations", auth, async (req, res) => {
  try {
    const organizations = await UserOrganization.find({
      user_id: req.user.userId,
    }).populate("organization_id");
    res.json(organizations);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
