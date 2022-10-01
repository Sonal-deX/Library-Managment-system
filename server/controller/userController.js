const Users = require('../models/user')

// add user controller
exports.addUser = async (req, res) => {
    let newUser = new Users(req.body)
    if (newUser.userType == 'teacher') { newUser.grade = 0, newUser.class = "NULL" }
    if (newUser.userType == 'student') { newUser.subject = "NULL" }
    if (newUser.userType == 'admin') { newUser.grade = 0, newUser.class = "NULL", newUser.subject = "NULL" }
    newUser.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'user successfully saved'
        });
    })
}

// read users controller
exports.readUser = async (req, res) => {
    Users.find((err, data) => {
        if (err) {
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

// read user by id controller
exports.readUserById = async (req, res) => {
    const id = req.params.id
    Users.findById(id, (err, data) => {
        if (err) {
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

// update user controller and status update when user trying to delete
exports.updateUser = async (req, res) => {
    Users.findByIdAndUpdate(
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
                success: 'User successfully updated',
            });
        }
    );
}

