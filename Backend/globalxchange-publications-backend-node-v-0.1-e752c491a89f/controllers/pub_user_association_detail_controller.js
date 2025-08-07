const express = require('express');
const router = express.Router();

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const association = require('../models/pub_user_association_detail');

// Create a user_association record
router.post('/', (req, res) => {
    association.create({
        user_id: req.query.user_id,
        association_relation: req.query.association_relation,
        association_entity: req.query.association_entity,
        entity_id: req.query.entity_id,
    }).then(associateDetail => {
        res.json({
            status: true,
            data: associateDetail
        });
    }).catch(err => {
        // console.log("err====>",err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get all user_association record
router.get('/', (req, res) => {
    let filter = {};
    if (req.query.user_id) filter.user_id = req.query.user_id;
    if (req.query.association_relation) filter.association_relation = req.query.association_relation;
    if (req.query.association_entity) filter.association_entity = req.query.association_entity;
    if (req.query.entity_id) filter.entity_id = req.query.entity_id;
    association.find(filter, null, { sort: { "createdAt": -1 } }).then(associateDetail => {
        res.json({
            status: true,
            data: associateDetail
        });
    }).catch(err => {
        // console.log("err====>",err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get a specific user_association record by ID
router.get('/:id', (req, res) => {
    association.findOne({ _id: req.params.id }).then(associateDetail => {
        res.json({
            status: true,
            data: associateDetail
        });
    }).catch(err => {
        // console.log("err====>",err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific user_association record by ID
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.query.user_id) objForUpdate.user_id = req.query.user_id;
    if (req.query.association_relation) objForUpdate.association_relation = req.query.association_relation;
    if (req.query.association_entity) objForUpdate.association_entity = req.query.association_entity;
    if (req.query.entity_id) objForUpdate.entity_id = req.query.entity_id;
    if (req.body.status) objForUpdate.status = req.body.status;
    association.updateOne({ _id: req.params.id }).then(associateDetail => {
        res.json({
            status: true,
            data: associateDetail
        });
    }).catch(err => {
        // console.log("err====>",err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

module.exports = router;