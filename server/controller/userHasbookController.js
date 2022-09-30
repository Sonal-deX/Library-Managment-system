const UHB = require('../models/userHasbook')

// add userHasbook
exports.addUserHasBook = async (req,res)=>{
    const userHasbook = new UHB(req.body)
    userHasbook.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'saved successfully'
        });
    })
}

// read userHasBook
exports.readUserHasBook = async (req,res)=>{
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