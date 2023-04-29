const express = require('express');
const router = express.Router();
const { remove, edit, find, list, create } = require("../controllers/businessController");
const validatePermission = require('../core/validatePermission');

router.get('/', validatePermission('businesses.read'), list);
router.post('/', validatePermission('business.read'), create);
router.get('/:id', validatePermission('business.read'), find);
router.put('/:id', validatePermission('business.edit'), edit);
router.delete('/:id', validatePermission('business.destroy'), remove);

module.exports = router; 
