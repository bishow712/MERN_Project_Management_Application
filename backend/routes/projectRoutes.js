const express = require('express')
const router = express.Router()
const { getProject, setProject, updateProject, deleteProject } = require('../controller/projectController') 

router.route('/').get(getProject).post(setProject)
router.route('/:id').put(updateProject).delete(deleteProject)

module.exports = router