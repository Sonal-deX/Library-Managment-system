const Books = require('../models/book')

// add book controller
exports.addBook = async (req,res) => {
    let newBook = new Books(req.body)
    newBook.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'book saved successfully'
        });
    })
}