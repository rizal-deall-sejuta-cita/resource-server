const router = require('express').Router()

const users = require('./user');
const { errorHander } = require('../middlewares/errorHandler');

router.use('/users', users)
router.use(errorHander)

module.exports = router
