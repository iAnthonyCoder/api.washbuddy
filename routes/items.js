const express = require('express');
const router = express.Router();
const { remove, edit, find, list, create } = require("../controllers/itemController");
const validatePermission = require('../core/validatePermission');

router.get('/', validatePermission('items.read'), list);
router.post('/', validatePermission('item.read'), create);
router.get('/:id', validatePermission('item.read'), find);
router.put('/:id', validatePermission('item.edit'), edit);
router.delete('/:id', validatePermission('item.destroy'), remove);

module.exports = router; 
