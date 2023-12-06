const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getUser } = require('../controller/userController') 
const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(getUser)
// router.route('/:id').put(updateUser).delete(deleteUser)

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/', getUser)

module.exports = router