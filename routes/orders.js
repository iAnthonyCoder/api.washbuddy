const express = require('express');
const router = express.Router();
const { remove, edit, find, list, create } = require("../controllers/orderController");
const validatePermission = require('../core/validatePermission');

router.get('/', validatePermission('orders.read'), list);
router.post('/', validatePermission('order.read'), create);
router.get('/:id', validatePermission('order.read'), find);
router.put('/:id', validatePermission('order.edit'), edit);
router.delete('/:id', validatePermission('order.destroy'), remove);

module.exports = router; 
