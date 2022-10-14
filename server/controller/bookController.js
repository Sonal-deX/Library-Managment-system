const Books = require('../models/book')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dvn2f46xi',
    api_key: '938135774233877',
    api_secret: '25cGvp-gjQDpicalX7dYPYmpRzc'
})

// add book controller
exports.addBook = async (req, res) => {
    try {
        const imgUplaod = req.body.img
        const imgResponse = await cloudinary.uploader.upload(imgUplaod, { upload_preset: 'dgwb1u7a' })
        let newBook = new Books(req.body)
        newBook.status = 1
        newBook.availability = 1
        newBook.img = imgResponse.public_id
        newBook.save(async (err) => {
            if (err) {
                const imgDelete = await cloudinary.uploader.destroy(imgResponse.public_id)
                return res.status(400).json({
                    error: err
                });
               
            }
            return res.status(200).json({
                success: 'book successfully saved'
            });
        })
    }
    catch(err){console.log("error has occured",err);}
}

// read books controller
exports.readBook = async (req, res) => {
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
exports.readBookByID = async (req, res) => {
    const id = req.params.id
    Books.findById(id, (err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            data: data
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

