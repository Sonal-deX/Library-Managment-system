const UHB = require('../models/userHasbook')

// add userHasbook
exports.addUserHasBook = async (req,res)=>{
    const userHasbook = new UHB(req.body)
    userHasbook.borrowDate =new Date()
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
exports.readUserHasBook = async (req,res)=>{
    const id = req.params.id
    UHB.find().populate('user book').exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'saved successfully',
            data:data.filter(data => data.borrowDate.toUTCString())
        });
    })
}

// read userHasBook by id
exports.readUserHasBookByid = async (req,res)=>{
    const id = req.params.id
    UHB.findById(id).populate('user book').exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'saved successfully',
            data:data
        });
    })
}