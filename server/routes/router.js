const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController')
const userController = require('../controller/userController')
const userHasbookController = require('../controller/userHasbookController')

// book Routes
router.post('/book', bookController.addBook)
router.get('/book', bookController.readBook)
router.get('/book/:id', bookController.readBookByID)
router.put('/book/update/:id', bookController.updateBook)
router.delete('/book/delete/:id', bookController.updateBook)

// user Routes
router.post('/user',userController.addUser)
router.get('/user',userController.readUser)
router.get('/user/:id',userController.readUserById)
router.put('/user/update/:id',userController.updateUser)
router.delete('/user/delete/:id', userController.updateUser)

// useHasbook Routes
router.post('/uhb',userHasbookController.addUserHasBook)
router.get('/uhb/:id',userHasbookController.readUserHasBookByid)
router.get('/uhb',userHasbookController.readUserHasBook)

module.exports = router;