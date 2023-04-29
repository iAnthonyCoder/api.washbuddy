const router = require('express').Router();

router.use('/auth',             require('./auth'));
router.use('/passwords',        require('./passwords'));
router.use('/users',            require('./users'));
router.use('/businesses',       require('./businesses'));
router.use('/business_items',   require('./business_items'));
router.use('/items',            require('./items'));
router.use('/orders',            require('./orders'));

module.exports = router;
