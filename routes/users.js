const express = require('express');
const router = express.Router();
const { edit_me, get_me, edit, find, list, create } = require("../controllers/userController");
const validatePermission = require('../core/validatePermission');

// router.put('/me', validatePermission('user.edit_me'), edit_me);
router.get('/me', validatePermission('user.get_me'), get_me);
router.post('/', validatePermission('user.create'), create);
// router.get('/', validatePermission('users.read'), list);
// router.get('/:id', validatePermission('user.read'), find);
// router.put('/:id', validatePermission('user.edit'), edit);
// router.delete('/:_id', validatePermission('user.destroy'), remove);

module.exports = router; 
