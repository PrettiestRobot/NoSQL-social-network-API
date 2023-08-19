const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Attach the userRoutes to the path '/users'
router.use("/users", userRoutes);

// Attach the thoughtRoutes to the path '/thoughts'
router.use("/thoughts", thoughtRoutes);

module.exports = router;
