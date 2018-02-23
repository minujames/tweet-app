const router = require("express").Router();

const authenticationRoutes = require("./authentication");
const userRoutes = require("./user");

router.use("/auth", authenticationRoutes);
router.use("/user", userRoutes);

module.exports = router;
