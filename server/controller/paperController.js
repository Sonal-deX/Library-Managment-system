const Papers = require('../models/paper')

// add Paper controller
exports.addpaper = async (req, res) => {
    let newPaper = new Papers(req.body)
    newPaper.status = 1
    newPaper.availability = 1
    newPaper.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: 'Papers successfully saved'
        });
    })
}

// read Paper controller
exports.readPaper = async (req, res) => {
    Papers.find((err, data) => {
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
exports.readPaperByID = async (req, res) => {
    const id = req.params.id
    Papers.findById(id, (err, data) => {
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
exports.updatePaper = async (req, res) => {
    Papers.findByIdAndUpdate(
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
                success: 'Papers successfully updated'
            });
        }
    );
}