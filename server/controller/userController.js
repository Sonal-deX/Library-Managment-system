const Users = require('../models/user')

// add user controller
exports.addUser = async (req,res) => {
    let newUser = new Users(req.body)
    newUser.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'user saved successfully'
        });
    })
}