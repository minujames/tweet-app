const router = require("express").Router();
const authenticationController = require("../../controllers/authenticationController");

router.route('/login')
 .post(authenticationController.login);

module.exports = router;
