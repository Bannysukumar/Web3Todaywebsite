const express = require('express');
const router = express.Router();

const field_detail = require('../models/pub_field_data');
const group = require('../models/pub_group_field');

const { dbConnection,mongodbConnection } = require('../mongodb_connection');
let database = dbConnection();

// Create a field detail record
router.post('/', async (req, res) => {
    if (req.body.app_code && req.body.key_group && req.body.name && req.body.field_type && req.body.sub_type && req.body.collection_name && req.body.created_by) {
        // var fieldKey=req.body.field_key;
        var fieldKey = req.body.name;
        fieldKey = fieldKey.replace(/[^a-zA-Z]/g, "");
        fieldKey = fieldKey.toLowerCase();
        // console.log("processed======> Field Key:",fieldKey);
        let GroupfieldExist = await field_detail.findOne({ group_id: req.body.group_id, field_key: fieldKey });
        let groups = await group.findOne({ group_id: req.body.group_id });
        if (groups) {
            let field_name = fieldKey;
            const db = await database;
            var projectObject = {};
            projectObject["_id"] = 0;
            projectObject[field_name] = 1;
            let records = await db.collection(req.body.collection_name).find({}).project(projectObject).toArray();
            let fieldExist = false;
            for (let i = 0; i < records.length; i++) {
                // console.log("Object.keys(records).length===", Object.keys(result).length)
                if (Object.keys(records[i]).length == 0) {
                    fieldExist = false;
                } else {
                    fieldExist = true;
                    break;
                }
            }
            // console.log('fieldExist----', fieldExist)
            // console.log('GroupfieldExist----', GroupfieldExist)
            if (!GroupfieldExist && !fieldExist) {
                // create
                field_detail.create({
                    group_id: req.body.group_id,
                    app_code: req.body.app_code,
                    key_group: req.body.key_group,
                    field_key: fieldKey,
                    name: req.body.name,
                    description: req.body.description,
                    field_type: req.body.field_type,
                    sub_type: req.body.sub_type,
                    field_icon: req.body.field_icon,
                    collection_name: req.body.collection_name,
                    created_by: req.body.created_by,
                }).then(fieldDetail => {
                    let defaultValue = "";
                    if (fieldDetail.field_type == "string") {
                        defaultValue = "";
                    } else if (fieldDetail.field_type == "array") {
                        defaultValue = [];
                    } else if (fieldDetail.field_type == "number") {
                        defaultValue = 0;
                    } else if (fieldDetail.field_type == "object") {
                        defaultValue = {};
                    } else if (fieldDetail.field_type == "boolean") {
                        defaultValue = false;
                    }
                    const filter_field_key = {}
                    filter_field_key[fieldDetail.field_key] = undefined;
                    const set_field_val = {};
                    set_field_val[fieldDetail.field_key] = defaultValue;
                    // console.log("filter_field_key=====", filter_field_key);
                    // console.log("set_field_val=====", set_field_val);

                    // let updateRecordField = await mall.find(filter_field_key);
                    // let updateRecordField = await mall.updateMany(filter_field_key,{$set: set_field_val}, {"multi": true});// change the field name collection name and query type
                    db.collection(req.body.collection_name).updateMany(filter_field_key, { $set: set_field_val }, function (err, result) {
                        if (err) {
                            console.log("errr=====>", err);
                        }
                        else {
                            console.log("updated the existing field Records");
                        }
                    });
                    // console.log('updateaaa=========', updateRecordField.value);
                    res.json({
                        status: true,
                        data: fieldDetail
                    });
                }).catch(err => {
                    // console.log('err=====>', err);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
                // res.json({status:true, message:"created"});
            } else {
                //  don't create
                res.json({
                    status: false,
                    message: 'Field already exist'
                });
            }
        } else {
            res.json({
                status: false,
                message: 'Enter the valid group ID'
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Required Fields are missing'
        });
    }
});

// Get all field detail records
router.get('/', (req, res) => {
    var filter = {};
    field_detail.find(filter, null, { sort: { "createdAt": -1 } }).then(fieldDetails => {
        res.json({
            status: true,
            data: fieldDetails
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get all field detail for specific group
router.get('/group/', async (req, res) => {
    var filter = {};
    if (req.query.groupid) {
        filter.group_id = req.query.groupid;
        var groupdata = await group.findOne({ group_id: req.query.groupid });
    }
    if (req.query.app_code) filter.app_code = req.query.app_code;
    if (req.query.collection_name) filter.collection_name = req.query.collection_name;
    field_detail.find(filter, null, { sort: { "createdAt": -1 } }).then(fieldDetails => {
        // let resp_data = fieldDetails;
        // console.log("groupdata", groupdata);
        const resp_data = {};
        if (groupdata) {
            resp_data['groupdetail'] = groupdata;
            resp_data['fields'] = fieldDetails;
            res.json({
                status: true,
                data: resp_data
            });
        } else {
            res.json({
                status: true,
                data: fieldDetails
            });
        }
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get a specific field detail by ID
router.get('/:id', (req, res) => {
    field_detail.findOne({ _id: req.params.id }).then(fieldDetail => {
        res.json({
            status: true,
            data: fieldDetail
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific field detail by ID
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.field_icon) objForUpdate.field_icon = req.body.field_icon;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.key_group) objForUpdate.key_group = req.body.key_group;
    field_detail.updateOne({ _id: req.params.id }, objForUpdate).then(fieldDetail => {
        res.json({
            status: true,
            message: "Successfully updated"
        });
    }).catch(err => {
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Delete a specific field detail by ID
router.delete('/:id', (req, res) => {
    const objForUpdate = {};
    objForUpdate.status = "inactive";
    field_detail.updateOne({ _id: req.params.id }, objForUpdate).then(fieldDetail => {
        res.json({
            status: true,
            message: "Deleted the field"
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