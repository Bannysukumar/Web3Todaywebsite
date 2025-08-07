const express = require('express');
const router = express.Router();
// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const admin = require('../models/pub_admin_detail');

//Create a admin detail record for authenticatig the user access level 
router.post('/', (req, res) => {
    admin.create({
        email: req.body.email,
        name: req.body.name,
        reffer_by_email: req.body.reffer_by_email,
        access_level: req.body.access_level,
        product_name: req.body.product_name,
    }).then(adminDetail => {
        res.json({
            status: true,
            data: adminDetail
        });
    }).catch(err => {
        console.log("err====>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// get all the records available
router.get('/', (req, res) => {
    const filter = {};
    admin.find(filter, null, { sort: { "createdAt": -1 } }).then(adminDetails => {
        res.json({
            status: true,
            data: adminDetails
        });
    }).catch(err => {
        console.log("err====>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// get a record available using id
router.get('/:id', (req, res) => {
    admin.findOne({ _id: req.params.id }).then(adminDetails => {
        res.json({
            status: true,
            data: adminDetails
        });
    }).catch(err => {
        console.log("err====>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// get all records available by a specific mail id
router.get('/email/:email', (req, res) => {
    admin.find({ email: req.params.email }).then(adminDetails => {
        res.json({
            status: true,
            data: adminDetails
        });
    }).catch(err => {
        console.log("err====>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// get all records available referred by a specific mail id
router.get('/refemail/:email', (req, res) => {
    admin.find({ reffer_by_email: req.params.email }).then(adminDetails => {
        res.json({
            status: true,
            data: adminDetails
        });
    }).catch(err => {
        console.log("err====>", err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific admindetail using admin id
router.put('/set/:id', (req, res) => {
    const collection_name = "bos_admindetails";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.name) objForUpdate.name = req.body.name;
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
        console.log("err", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

module.exports = router;