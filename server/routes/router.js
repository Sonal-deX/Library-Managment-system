const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController')
const userController = require('../controller/userController')
const userHasbookController = require('../controller/userHasbookController')

// book Routes
router.post('/book', bookController.addBook)

// user Routes
router.post('/user',userController.addUser)

// useHasbook Routes
router.post('/uhb',userHasbookController.addUserHasBook)
router.get('/uhb/:id',userHasbookController.readUserHasBook)

module.exports = router;