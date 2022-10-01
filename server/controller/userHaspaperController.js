const UHP = require('../models/userHaspaper')
const Papers = require('../models/paper')

// add userHaspaper
exports.addUserHasPaper = async (req, res) => {
    const userHaspaper = new UHP(req.body)
    userHaspaper.purchaseDate = new Date()

    // paper quantity manage 
    const x = await Papers.findById(userHaspaper.paper.valueOf())
    x.qty = x.qty - userHaspaper.qty
    if (x.qty < 0) {
        return res.status(400).json({
            error: "insuffient stock"
        })
    }
    x.save()

    userHaspaper.save((err, data) => {
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

// read userHaspaper
exports.readUserHasPaper = async (req, res) => {
    UHP.find().populate('user paper').exec((err, data) => {
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
exports.readUserHasPaperkByid = async (req, res) => {
    const id = req.params.id
    UHP.findById(id).populate('user paper').exec((err, data) => {
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