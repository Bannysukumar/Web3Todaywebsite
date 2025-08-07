const express = require('express');
const router = express.Router();

const sanction = require('../models/pub_app_owner_sanction');

// Create a credential transfer 
router.post('/', (req, res) => {
    sanction.create({
        application_id: req.body.application_id,
        oldUser_email: req.body.oldUser_email,
        newUser_email: req.body.newUser_email,
        type: req.body.type,
        comment: req.body.comment,
    }).then(transferDetail => {
        res.json({
            status: true,
            data: transferDetail
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: true,
            message: err.message
        });
    });
});

// Get all credential transfer
router.get('/', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    sanction.find(filter, null, { sort: { "createdAt": -1 } })
        .then(transferDetail => {
            res.json({
                status: true,
                data: transferDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// Get a specific credential transfer
router.get('/:id', (req, res) => {
    sanction.findOne({ _id: req.params.id })
        .then(transferDetail => {
            res.json({
                status: true,
                data: transferDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// Get a specific old email all credential transfer
router.get('/oldemail/:email', (req, res) => {
    sanction.find({ oldUser_email: req.params.email }, null, { sort: { "createdAt": -1 } })
        .then(transferDetail => {
            res.json({
                status: true,
                data: transferDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// Get a specific new email all credential transfer
router.get('/oldemail/:email', (req, res) => {
    sanction.find({ newUser_email: req.params.email }, null, { sort: { "createdAt": -1 } })
        .then(transferDetail => {
            res.json({
                status: true,
                data: transferDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// Update a specific credential transfer
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.application_id) objForUpdate.application_id = req.body.application_id;
    if (req.body.oldUser_email) objForUpdate.oldUser_email = req.body.oldUser_email;
    if (req.body.newUser_email) objForUpdate.newUser_email = req.body.newUser_email;
    if (req.body.comment) objForUpdate.comment = req.body.comment;
    if (req.body.status) objForUpdate.status = req.body.status;

    sanction.updateOne({ _id: req.params.id }, objForUpdate)
        .then(transferDetail => {
            res.json({
                status: true,
                message: "successfully update"
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

module.exports = router;