const Pdf = require('../models/pdf')

// add pdf controller
exports.addPdf = async (req, res) => {
    let newPdf = new Pdf(req.body)
    newPdf.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: 'Pdf successfully saved'
        });
    })
}

// read pdfs controller
exports.readPdf = async (req, res) => {
    Pdf.find((err, data) => {
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

// update pdf controller and status update when book trying to delete
exports.updatePdf = async (req, res) => {
    Pdf.findByIdAndUpdate(
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
                success: 'PDF successfully updated'
            });
        }
    );
}