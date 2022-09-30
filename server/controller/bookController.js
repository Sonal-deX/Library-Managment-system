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
            success: 'book successfully saved'
        });
    })
}

// read books controller
exports.readBook = async (req,res) => {
    Books.find((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            data: data.filter(data => data.status === 1)
        });
    });
}

// read book by id controller
exports.readBookByID = async (req,res) => {
    const id = req.params.id
    Books.findById(id,(err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            data: data.filter(data => data.status === 1)
        });
    });
}

// update book controller and status update when book trying to delete
exports.updateBook = async (req, res) => {
    Books.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, data) => {
            if (err || !data) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: 'book successfully updated'
            });
        }
    );
}

