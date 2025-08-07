const express = require('express');
const router = express.Router();
const uniqid = require("uniqid");

const group_detail = require('../models/pub_group_field');

// Create a group field record
router.post('/', (req, res) => {
    if (req.body.app_code && req.body.group_for && req.body.name && req.body.description && req.body.group_icon && req.body.collection_name && req.body.created_by) {
        group_detail.create({
            "group_id": uniqid(),
            "app_code": req.body.app_code,
            "group_for": req.body.group_for,
            "name": req.body.name,
            "description": req.body.description,
            "group_icon": req.body.group_icon,
            "collection_name": req.body.collection_name,
            "created_by": req.body.created_by,
        }).then(groupDetail => {
            res.json({
                status: true,
                data: groupDetail
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
    } else {
        res.json({
            status: false,
            message: 'Required Fields are missing'
        });
    }
});

// Get all group field record
router.get('/', (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.name) filter.name = req.query.name;
    if (req.query.app_code) filter.app_code = req.query.app_code;
    if (req.query.collection_name) filter.collection_name = req.query.collection_name;
    group_detail.find(filter, null, { sort: { "createdAt": -1 } }).then(groupDetails => {
        res.json({
            status: true,
            data: groupDetails
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get a specific group record by ID
router.get('/:id', (req, res) => {
    group_detail.findOne({ _id: req.params.id }).then(groupDetail => {
        res.json({
            status: true,
            data: groupDetail
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific group record by ID
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.status) objForUpdate.status = req.body.status;
    if (req.body.group_icon) objForUpdate.group_icon = req.body.group_icon;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.group_for) objForUpdate.group_for = req.body.group_for;
    group_detail.updateOne({ _id: req.params.id }, objForUpdate).then(groupDetail => {
        res.json({
            status: true,
            message: 'Successfully Updated'
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Delete a specific group record by ID
router.delete('/:id', (req, res) => {
    const objForUpdate = {};
    objForUpdate.status = "inactive";
    group_detail.updateOne({ _id: req.params.id }, objForUpdate).then(groupDetail => {
        res.json({
            status: true,
            message: 'Deleted the field'
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

module.exports = router;