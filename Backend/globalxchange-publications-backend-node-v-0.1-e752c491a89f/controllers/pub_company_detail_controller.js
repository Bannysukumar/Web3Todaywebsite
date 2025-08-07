const express = require('express');
const router = express.Router();

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const company = require('../models/pub_company_detail');
const publication = require('../models/pub_publication_detail');

// create a company
router.post('/', async (req, res) => {
    if (req.body.publication_id) { // check if publication id is present
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        if (publicationdetail) {
            if (req.body.email && req.body.name && req.body.country && req.body.industry && req.body.sector) {
                company.create({
                    email: req.body.email,
                    name: req.body.name,
                    country: req.body.country,
                    sector: req.body.sector,
                    publication_id: req.body.publication_id,
                    industry: req.body.industry,
                    founders: req.body.founders,
                    investors: req.body.investors,
                    profile_pic: req.body.profile_pic,
                    cover_pic: req.body.cover_pic,
                    short_desc: req.body.short_desc,
                    description: req.body.description,
                    website: req.body.website,
                    social_media: req.body.social_media,
                    number_of_offices: req.body.number_of_offices,
                }).then(companyDetail => {
                    res.json({
                        status: true,
                        data: companyDetail
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
        } else {
            res.json({
                status: false,
                message: "Publication not found"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Publication Id Required"
        });
    }
});

// get all companies
router.get('/', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.email)
        filter.email = req.query.email;
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }
    company.find(filter, null, { sort: { "createdAt": -1 } })
        .then(companyDetails => {
            if(companyDetails.length > 0){
            res.json({
                status: true,
                total_count: companyDetails.length,
                data: companyDetails
            });
        }else{
            res.json({
                status: false,
                message:"No data found"
            });
        }
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get a specific company by Id
router.get('/:id', (req, res) => {
    company.findOne({ _id: req.params.id })
        .then(companyDetail => {
            res.json({
                status: true,
                data: companyDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// update a specific company by Id
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
    if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
    if (req.body.website) objForUpdate.website = req.body.website;
    if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.status) objForUpdate.status = req.body.status;
    if (req.body.country) objForUpdate.country = req.body.country;
    if (req.body.sector) objForUpdate.sector = req.body.sector;
    if (req.body.industry) objForUpdate.industry = req.body.industry;
    if (req.body.founders) objForUpdate.founders = req.body.founders;
    if (req.body.investors) objForUpdate.investors = req.body.investors;
    if (req.body.short_desc) objForUpdate.short_desc = req.body.short_desc;
    if (req.body.number_of_offices) objForUpdate.number_of_offices = req.body.number_of_offices;
    company.updateOne({ _id: req.params.id }, objForUpdate)
        .then(companyDetail => {
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

// update a specific company by Id (Dynamic)
router.put('/set/:id', (req, res) => {
    const collection_name = "pub_company_details";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.name) objForUpdate.name = req.body.name;
        if (req.body.country) objForUpdate.country = req.body.country;
        if (req.body.sector) objForUpdate.sector = req.body.sector;
        if (req.body.industry) objForUpdate.industry = req.body.industry;
        if (req.body.founders) objForUpdate.founders = req.body.founders;
        if (req.body.investors) objForUpdate.investors = req.body.investors;
        if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
        if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
        if (req.body.short_desc) objForUpdate.short_desc = req.body.short_desc;
        if (req.body.description) objForUpdate.description = req.body.description;
        if (req.body.website) objForUpdate.website = req.body.website;
        if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
        if (req.body.number_of_offices) objForUpdate.number_of_offices = req.body.number_of_offices;
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

module.exports = router;