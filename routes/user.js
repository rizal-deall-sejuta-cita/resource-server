const router = require('express').Router()

const Controller = require('../controllers/userController');
const { adminOnly } = require('../middlewares/adminOnly');

router.get('/:id', Controller.findById)

router.use(adminOnly)

router.get('/', Controller.findAll)
router.post('/', Controller.createUser)
router.put('/:id', Controller.updateUser)
router.delete('/:id', Controller.deleteUser)

module.exports = router