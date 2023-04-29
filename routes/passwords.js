const { forgot, reset, validate } = require("../controllers/passwordController");
const express = require('express');
const router = express.Router();

router.post('/forgot', forgot);
router.post('/reset', reset);
// router.get('/validate-token/:token', validate);
// router.post('/resend', resendToken);

module.exports = router;