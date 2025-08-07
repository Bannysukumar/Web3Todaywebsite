const express = require('express');
const router = express.Router();
const axios = require('axios');
const country = require('../models/pub_country_detail');

// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const countryuri = "https://storeapi.apimachine.com/dynamic/InstaCryptoPurchase/Countrydem?key=b6459026-2535-434e-bc4c-893fae5fc87d";

// Create a country Record
router.post('/', (req, res) => {
    if (req.body.country_name && req.body.country_code) {
        country.create({
            country_name: req.body.country_name,
            flag: req.body.flag,
            country_code: req.body.country_code,
            description: req.body.description,
        }).then(countryDetail => {
            res.json({
                status: true,
                data: countryDetail
            });
        }).catch(err => {
            // console.log("err====>",err);
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

// adding all records available from countryuri
router.get('/uriadd/', (req, res) => {
    axios.get(countryuri).then(countryDetail => {
        console.log("aaaaaaa", countryDetail.data.data);
        let carray = new Array();
        for (let i = 0; i < countryDetail.data.data.length; i++) {
            let arobj = {};
            console.log("aaaaaaa=======", countryDetail.data.data[i]);
            arobj.country_name = countryDetail.data.data[i].formData.Name;
            arobj.flag = countryDetail.data.data[i].formData.Flag;
            arobj.country_code = countryDetail.data.data[i].formData.CountryCode;
            carray.push(arobj);
        }
        country.insertMany(carray, (err, resp) => {
            if (err) {
                // console.log("err====>",err);
                res.json({
                    status: false,
                    message: err.message
                });
            } else {
                res.json({
                    status: true,
                    data: resp
                });
            }
        });
        // console.log("aaaaaaaqqqqq", carray);
        // res.json({
        //     status: true,
        //     data: countryDetail.data
        // });
    }).catch(err => {
        // console.log("err====>",err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get all country Records
router.get('/', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    country.find(filter, null, { sort: { "createdAt": -1 } }).then(countryDetail => {
        res.json({
            status: true,
            data: countryDetail
        });
    }).catch(err => {
        // console.log("err====>",err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get a specific country Record by ID
router.get('/:id', (req, res) => {
    country.findOne({ _id: req.params.id }).then(countryDetail => {
        res.json({
            status: true,
            data: countryDetail
        });
    }).catch(err => {
        // console.log("err====>",err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific country Record by ID
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.country_name) objForUpdate.country_name = req.body.country_name;
    if (req.body.flag) objForUpdate.flag = req.body.flag;
    if (req.body.country_code) objForUpdate.country_code = req.body.country_code;
    if (req.body.description) objForUpdate.description = req.body.description;

    country.updateOne({ _id: req.params.id }, objForUpdate).then(countryDetail => {
        res.json({
            status: true,
            message: "Successfull Updated"
        });
    }).catch(err => {
        // console.log("err====>",err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

router.put('/set/:id', (req, res) => {
    const collection_name = "pub_country_details";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.country_name) objForUpdate.country_name = req.body.country_name;
        if (req.body.flag) objForUpdate.flag = req.body.flag;
        if (req.body.country_code) objForUpdate.country_code = req.body.country_code;
        if (req.body.description) objForUpdate.description = req.body.description;
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

// Delete a specific country Record by ID
router.delete('/:id', (req, res) => {
    country.updateOne({ _id: req.params.id })
    .then(countryDetail => {
        res.json({
            status: true,
            message:'Deleted the Country Record'
        });
    }).catch(err => {
        // console.log("err====>",err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

module.exports = router;