const express = require('express');
const router = express.Router()
const { getAll, createUser, updateUser, searchUsers, deleteUsers } = require('../controllers/task');
const { validation } = require('../middlewares/validation');


router.get('/', getAll)
router.post('/', createUser)
router.get('/:id', validation, searchUsers)
router.put('/:id', validation, updateUser)
router.delete('/:id', deleteUsers)

module.exports = router

