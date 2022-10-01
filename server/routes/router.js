const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController')
const userController = require('../controller/userController')
const userHasbookController = require('../controller/userHasbookController')
const paperController = require('../controller/paperController')
const userHaspaperController = require('../controller/userHaspaperController')
const pdfController = require('../controller/pdfController')

// book Routes
router.post('/book', bookController.addBook)
router.get('/book', bookController.readBook)
router.get('/book/:id', bookController.readBookByID)
router.put('/book/update/:id', bookController.updateBook)
router.delete('/book/delete/:id', bookController.updateBook)

// user Routes
router.post('/user', userController.addUser)
router.get('/user', userController.readUser)
router.get('/user/:id', userController.readUserById)
router.put('/user/update/:id', userController.updateUser)
router.delete('/user/delete/:id', userController.updateUser)

// userHasbook Routes
router.post('/uhb', userHasbookController.addUserHasBook)
router.get('/uhb/:id', userHasbookController.readUserHasBookByid)
router.get('/uhb', userHasbookController.readUserHasBook)
router.put('/uhb/update/:id', userHasbookController.updateUserHasBook)

// paper Routes
router.post('/paper', paperController.addpaper)
router.get('/paper', paperController.readPaper)
router.get('/paper/:id', paperController.readPaperByID)
router.put('/paper/update/:id', paperController.updatePaper)
router.delete('/paper/delete/:id', paperController.updatePaper)

// userHaspaper Routes
router.post('/uhp', userHaspaperController.addUserHasPaper)
router.get('/uhp/:id', userHaspaperController.readUserHasPaperkByid)
router.get('/uhp', userHaspaperController.readUserHasPaper)

// pdf Routes
router.post('/pdf', pdfController.addPdf)
router.get('/pdf', pdfController.readPdf)
router.put('/pdf/update/:id', pdfController.updatePdf)
router.delete('/pdf/delete/:id', pdfController.updatePdf)

module.exports = router;