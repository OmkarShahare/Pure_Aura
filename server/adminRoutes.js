const express = require("express");
const router = express.Router();
const SpaUser = require("./model/userSchema.js");


// Hardcoded admin login (You can use bcrypt + DB later)
const ADMIN_EMAIL = "1";
const ADMIN_PASSWORD = "1";

// LOGIN API
router.post("/admin/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // // Set session for admin
        // req.session.admin = true;
        return res.json({ success: true, message: "Login successful" });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
});

// GET ALL USERS
router.get("/admin/users", async (req, res) => {
    // if (!req.session.admin) {
    //     return res.status(403).json({ message: "Not authorized" });
    // }

    const users = await SpaUser.find({});
    res.json(users);
});

// DELETE USER
router.delete("/admin/user/:id", async (req, res) => {
    // if (!req.session.admin) {
    //     return res.status(403).json({ message: "Not authorized" });
    // }

    await SpaUser.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// UPDATE USER
router.put("/admin/user/:id", async (req, res) => {
    // if (!req.session.admin) {
    //     return res.status(403).json({ message: "Not authorized" });
    // }

    const updatedUser = await SpaUser.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedUser);
});

module.exports = router;
