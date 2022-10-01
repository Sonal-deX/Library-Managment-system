const UHB = require('../models/userHasbook')
const Books = require('../models/book')

// add userHasbook
exports.addUserHasBook = async (req, res) => {
    const userHasbook = new UHB(req.body)
    userHasbook.borrowDate = new Date()
    userHasbook.status = 1

    // book quantity and availability manage 
    const book = await Books.findById(userHasbook.book.valueOf())
    book.qty = book.qty - 1
    if (book.qty < 0) {
        return res.status(400).json({
            error: "insuffient stock"
        })
    }
    if (book.qty == 0) { book.availability = 2 }
    book.save()

    userHasbook.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'saved successfully',

        });
    })
}

// read userHasBook
exports.readUserHasBook = async (req, res) => {
    const id = req.params.id
    UHB.find().populate('user book').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'saved successfully',
            data: data
        });
    })
}

// read userHasBook by id
exports.readUserHasBookByid = async (req, res) => {
    const id = req.params.id
    UHB.findById(id).populate('user book').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'saved successfully',
            data: data
        });
    })
}

// update userHasBook 
exports.updateUserHasBook = async (req, res) => {

    const userHasbook = await UHB.findById(req.params.id)

    // book quantity and availability manage 
    const book = await Books.findById(userHasbook.book.valueOf())
    book.qty = book.qty + 1
    book.availability = 1
    book.save()
        .then(() => {
            userHasbook.status = 2
            userHasbook.returnDate = new Date()
            userHasbook.save()
                .then(() => {
                    return res.status(200).json({
                        success: 'successfully updated',
                    });
                })
                .catch(() => {
                    return res.status(400).json({
                        error: err
                    });
                })
        })
        .catch(() => {
            return res.status(400).json({
                error: err
            });
        })


}