const express = require('express');
const router = express.Router();

const subCategory = require('../models/pub_sub_category')
const publication = require('../models/pub_publication_detail');
const mongoose = require('mongoose');


//Creating a new sub category

router.post('/new', async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        if (req.body.title && req.body.thumbnail) {
            subCategory.create({
                application_id: publicationdetail.fxa_app_id,
                title: req.body.title,
                thumbnail: req.body.thumbnail,
                description: req.body.description,
                colorCode: req.body.colorCode,
                category_id: req.body.category_id
            }).then(subCategoryDetails => {
                res.json({
                    status: true,
                    data: subCategoryDetails
                });
            }).catch(err => {
                res.json({
                    status: false,
                    message: err.message
                });
            });
        }
        else {
            res.json({
                status: false,
                message: "All field Required"
            });
        }
    } else {
        res.json({
            status: false,
            message: "All field Required"
        });
    }
});

// fetching details all sub categories available
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.category_id) {
        filter.category_id = req.query.category_id
    }
    let PublicationDetail
    if (req.query.publication_id) {
        PublicationDetail = await publication.findById(req.query.publication_id);
        if (PublicationDetail) {
            filter.application_id = PublicationDetail.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "publication not found"
            });
        }
    }
    subCategory.aggregate([
        {
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_categories",
                let: { category_id: "$category_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$category_id", "$_id"] },
                                    { $eq: ["$status", "active"] },
                                    req.query.publication_id ? { $eq: ["$application_id", mongoose.Types.ObjectId(PublicationDetail.fxa_app_id)] } : ""
                                ]
                            }
                        }
                    }
                ],
                as: "categories"
            }
        }
    ])
        .then(subCategories => {
            res.json({
                status: true,
                data: subCategories
            });
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            });
        });
});


// updating a specific sub category detail
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.title) objForUpdate.title = req.body.title;
    if (req.body.thumbnail) objForUpdate.thumbnail = req.body.thumbnail;
    if (req.body.status) objForUpdate.status = req.body.status;
    if (req.body.description) objForUpdate.description = req.body.description
    if (req.body.colorCode) objForUpdate.colorCode = req.body.colorCode
    if (req.body.category_id) objForUpdate.colorCode = req.body.category_id
    subCategory.updateOne({ _id: req.params.id }, { new: true }, objForUpdate)
        .then(categoryDetails => {
            res.json({
                status: true,
                message: "Update successfully",
                data: categoryDetails
            });
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            });
        });
});

// delete a specific sub category detail by ID
router.delete('/:id', (req, res) => {
    subCategory.updateOne({ _id: req.params.id }, { status: 'inactive' })
        .then(subCategoryDetails => {
            res.json({
                status: true,
                data: subCategoryDetails
            });
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            });
        });
});

module.exports = router;
