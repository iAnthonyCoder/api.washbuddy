const express = require('express');
const router = express.Router();
const { remove, edit, find, list, create } = require("../controllers/business_itemController");
const validatePermission = require('../core/validatePermission');

router.get('/', validatePermission('business_items.read'), list);
router.post('/', validatePermission('business_item.create'), create);
router.get('/:id', validatePermission('business_item.read'), find);
router.put('/:id', validatePermission('business_item.edit'), edit);
// router.delete('/:id', validatePermission('business_item.destroy'), remove);

module.exports = router; 
