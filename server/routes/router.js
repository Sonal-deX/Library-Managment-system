const express = require('express');
const router = express.Router();

// import controllers
const bookController = require('../controller/bookController')
const userController = require('../controller/userController')
const userHasbookController = require('../controller/userHasbookController')
const paperController = require('../controller/paperController')
const userHaspaperController = require('../controller/userHaspaperController')
const pdfController = require('../controller/pdfController')

// import validation schemas
const { bookValidation, paperValidation, userValidation, pdfValidation } = require('../validation/validator')

// book Routes
router.post('/book', bookValidation, bookController.addBook)
router.get('/book', bookController.readBook)
router.get('/book/:id', bookController.readBookByID)
router.put('/book/update/:id', bookValidation, bookController.updateBook)
router.delete('/book/delete/:id', bookController.updateBook)

// user Routes
router.post('/user', userValidation, userController.addUser)
router.get('/user', userController.readUser)
router.get('/user/:id', userController.readUserById)
router.put('/user/update/:id', userValidation, userController.updateUser)
router.delete('/user/delete/:id', userController.updateUser)

// paper Routes
router.post('/paper', paperValidation, paperController.addpaper)
router.get('/paper', paperController.readPaper)
router.get('/paper/:id', paperController.readPaperByID)
router.put('/paper/update/:id', paperValidation, paperController.updatePaper)
router.delete('/paper/delete/:id', paperController.updatePaper)

// pdf Routes
router.post('/pdf', pdfValidation, pdfController.addPdf)
router.get('/pdf', pdfController.readPdf)
router.put('/pdf/update/:id', pdfValidation, pdfController.updatePdf)
router.delete('/pdf/delete/:id', pdfController.updatePdf)

// userHasbook Routes
router.post('/uhb', userHasbookController.addUserHasBook)
router.get('/uhb/:id', userHasbookController.readUserHasBookByid)
router.get('/uhb', userHasbookController.readUserHasBook)
router.put('/uhb/update/:id', userHasbookController.updateUserHasBook)

// userHaspaper Routes
router.post('/uhp', userHaspaperController.addUserHasPaper)
router.get('/uhp/:id', userHaspaperController.readUserHasPaperkByid)
router.get('/uhp', userHaspaperController.readUserHasPaper)

module.exports = router;