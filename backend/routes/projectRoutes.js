const express = require('express')
const router = express.Router()
const { getProject, setProject, updateProject, deleteProject } = require('../controller/projectController') 
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getProject).post(protect, setProject)
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject)

module.exports = router