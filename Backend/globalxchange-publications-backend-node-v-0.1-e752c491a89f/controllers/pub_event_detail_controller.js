const express = require('express');
const router = express.Router();

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const event = require('../models/pub_event_detail');

// Create an Event
router.post('/', (req, res) => {
    if (req.body.name && req.body.email && req.body.start_date && req.body.end_date && req.body.duration) {
        event.create({
            name: req.body.name,
            email: req.body.email,
            cover_pic: req.body.cover_pic,
            media: req.body.media,
            description: req.body.description,
            organized_by: req.body.organized_by,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            duration: req.body.duration,
            website: req.body.website,
            social_media: req.body.social_media,
            country: req.body.country,
        }).then(eventDetail => {
            res.json({
                status: true,
                data: eventDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: false,
                message: err.message
            });
        });
    } else {
        res.json({
            status: false,
            message: "All field Required"
        });
    }
});

// Get all Events
router.get('/', (req, res) => {
    event.find({}).then(eventDetail => {
        res.json({
            status: true,
            total_count: eventDetail.length,
            data: eventDetail
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get a specific Event by ID
router.get('/:id', (req, res) => {
    event.findOne({ _id: req.params.id }).then(eventDetail => {
        res.json({
            status: true,
            data: eventDetail
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific Event by ID
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
    if (req.body.media) objForUpdate.media = req.body.media;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.organized_by) objForUpdate.organized_by = req.body.organized_by;
    if (req.body.start_date) objForUpdate.start_date = req.body.start_date;
    if (req.body.end_date) objForUpdate.end_date = req.body.end_date;
    if (req.body.duration) objForUpdate.duration = req.body.duration;
    if (req.body.website) objForUpdate.website = req.body.website;
    if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
    if (req.body.status) objForUpdate.status = req.body.status;
    event.updateOne({ _id: req.params.id }, objForUpdate).then(eventDetail => {
        res.json({
            status: true,
            message: "successfully update"
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific Event by ID(Dynamic)
router.put('/set/:id', (req, res) => {
    const collection_name = "pub_event_details";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
        if (req.body.media) objForUpdate.media = req.body.media;
        if (req.body.description) objForUpdate.description = req.body.description;
        if (req.body.organized_by) objForUpdate.organized_by = req.body.organized_by;
        if (req.body.start_date) objForUpdate.start_date = req.body.start_date;
        if (req.body.end_date) objForUpdate.end_date = req.body.end_date;
        if (req.body.duration) objForUpdate.duration = req.body.duration;
        if (req.body.website) objForUpdate.website = req.body.website;
        if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
        if (req.body.status) objForUpdate.status = req.body.status;
        // const db = await database;
        if (!(Object.keys(objForUpdate).length === 0 && objForUpdate.constructor === Object)) {
            let updatedBusiness = await dynamicMiddleware.updatedynamicObject(collection_name, condition, objForUpdate);
            if (updatedBusiness.status) {
                res.json({
                    status: true,
                    message: 'Successfully Updated!',
                });
            }
            // db.collection(collection_name).updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: { ...objForUpdate } }, function (err, result) {
            //     // db.collection(collection_name).updateOne({ _id: req.params.id }, { $set: { ...cleanData.data } }, function (err, result) {
            //     if (err) {
            //         res.json({
            //             status: false,
            //             message: err.message
            //         });
            //     }
            //     else {
            //         res.json({
            //             status: true,
            //             message: 'Updated Successfully'
            //         });
            //     }
            // });
        } else {
            res.json({
                status: false,
                message: "Atlest one field is required to update"
            });
        }
    }).catch(err => {
        // console.log("err==>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Delete a specific Event by ID
router.delete('/:id', (req, res) => {
    event.updateOne({ _id: req.params.id }, { status: 'inactive' }).then(eventDetail => {
        res.json({
            status: true,
            message: 'Deleted the Event'
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

module.exports = router;
