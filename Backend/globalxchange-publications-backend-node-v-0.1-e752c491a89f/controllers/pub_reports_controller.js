const express = require('express');
const router = express.Router();
const { authenticateFun } = require('../middleware/authenticate');
// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const publisher = require('../models/pub_publisher_detail');
const publication = require('../models/pub_publication_detail');
const reports = require('../models/pub_reports');
const category = require('../models/pub_categories');
const navbar = require('../models/pub_navbar');
const mongoose = require('mongoose');

//creating a new report for a publication
router.post('/new', async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        if (publicationdetail) {
            if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.desc && req.body.icon && req.body.caseStudy && req.body.publication_id && req.body.coverPhoto) {
                let publisherExist = await publisher.findOne
                    ({ _id: req.body.publisher_id });
                if (!publisherExist) {
                    return res.json({
                        status: false,
                        message: 'Publisher does not exist',
                    });
                }
                let reportExist = await reports.findOne({
                    title: req.body.title
                });
                if (reportExist) {
                    return res.json({
                        status: false,
                        message: 'report already exist',
                    });
                }
                let categorydetail = await category.find({ _id: { $in: req.body.categoryType }, status: 'active' });
                let navbardetail = await navbar.find({ _id: { $in: req.body.navbar_id } });
                console.log(categorydetail.length == req.body.categoryType.length);
                if (categorydetail.length == req.body.categoryType.length && navbardetail.length == req.body.navbar_id.length) {
                    reports.create({
                        publisher_id: req.body.publisher_id,
                        application_id: publicationdetail.fxa_app_id,
                        title: req.body.title,
                        desc: req.body.desc,
                        icon: req.body.icon,
                        caseStudy: req.body.caseStudy,
                        coverPhoto: req.body.coverPhoto,
                        navbar_id: req.body.navbar_id,
                        categoryType: req.body.categoryType,
                        reportPDF: req.body.reportPDF,
                        email: req.body.email
                    }).then(reportDetails => {
                        res.json({
                            status: true,
                            message: "Report created successfully",
                            data: reportDetails
                        });
                    }).catch(err => {
                        res.json({
                            status: false,
                            message: err.message
                        });
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Invalid category or navbar id"
                    });
                }

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
    }
});

//get all reports 
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.publisher_id) filter.publisher_id = mongoose.Types.ObjectId(req.query.publisher_id)
    if (req.query.email) filter.email = req.query.email
    if (req.query.publication_id) {
        let publicationExist = await publication.findOne({ _id: req.query.publication_id });
        if (publicationExist) {
            filter.application_id = publicationExist.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "Publication not found"
            });
        }
    }
    if (req.query.categoryType) filter.categoryType =  mongoose.Types.ObjectId(req.query.categoryType);
    if (req.query.navbar_id) filter.navbar_id = req.query.navbar_id;
    if (req.query.reportPDF) filter.reportPDF = req.query.reportPDF
    reports.aggregate([
        {
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                let: { "publisher_id": "$publisher_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$publisher_id", "$_id"] },
                                    { $eq: ["$status", "active"] },
                                ],
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            PublisherDetails: {
                                $push: { profile_pic: "$profile_pic", name: "$name" }
                            }
                        }
                    }
                ],
                as: "PublisherDetails"
            }
        },
    ])
        .then(ReportDetail => {
            if (ReportDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: ReportDetail.length,
                    data: ReportDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No reports found"
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

//get all reports for a navbar ID's array
router.get('/navbars', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    reports.find({ navbar_id: { $in: req.query.navbar }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(reportDetail => {
            if (reportDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: reportDetail.length,
                    data: reportDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No reports found"
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

//get all reports for a category ID's array
router.get('/categories', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    reports.find({ categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(reportDetail => {
            if (reportDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: reportDetail.length,
                    data: reportDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No reports found"
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

//Edit a specific report by ID
router.put('/:id', async (req, res) => {
    let reportExist = await reports.findOne({ _id: req.params.id });
    if (reportExist) {
        const objForUpdate = {};
        if (req.body.title) {
            let titleExist = await reports.findOne
                ({ title: req.body.title, _id: { $ne: req.params.id }, status: "active" });
            if (titleExist) {
                console.log("titleExist", titleExist);
                return res.json({
                    status: false,
                    message: "Title already exist"
                });
            }
            objForUpdate.title = req.body.title;
        }
        if (req.body.desc) objForUpdate.desc = req.body.desc;
        if (req.body.icon) objForUpdate.icon = req.body.icon;
        if (req.body.caseStudy) objForUpdate.caseStudy = req.body.caseStudy;
        if (req.body.coverPhoto) objForUpdate.coverPhoto = req.body.coverPhoto;
        if (req.body.reportPDF) objForUpdate.reportPDF = req.body.reportPDF;
        if (req.body.navbar_id) {
            let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
            if (navbarExist.length == req.body.navbar_id.length) {
                objForUpdate.navbar_id = req.body.navbar_id;
            } else {
                return res.json({
                    status: false,
                    message: "Invalid navbar id"
                });
            }
        }
        if (req.body.categoryType) {
            let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
            if (categoryExist.length == req.body.categoryType.length) {
                objForUpdate.categoryType = req.body.categoryType;
            } else {
                return res.json({
                    status: false,
                    message: "Invalid category id"
                });
            }
        }
        reports.findOneAndUpdate({ _id: req.params.id, status: "active" }, objForUpdate)
            .then(reportDetail => {
                if (reportDetail) {
                    res.json({
                        status: true,
                        message: 'Updated the report successfully'
                    });
                } else {
                    res.json({
                        status: false,
                        message: 'report not found'
                    });
                }
            }).catch(err => {
                console.log('err=========>', err);
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        res.json({
            status: false,
            message: "report not found"
        });
    }
})

//add navbar to a specific report by ID
router.put('/add/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length == req.body.navbar_id.length) {
            reports.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $addToSet: { navbar_id: { $each: req.body.navbar_id } } })
                .then(reportDetail => {
                    if (reportDetail) {
                        res.json({
                            status: true,
                            message: 'Updated the report successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'report not found'
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
        } else {
            return res.json({
                status: false,
                message: "Invalid navbar id"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Invalid navbar id / navbar id should be an array"
        });
    }
})

//remove navbar from a specific report by ID
router.put('/remove/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
    if (navbarExist.length == req.body.navbar_id.length) {
        reports.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $pullAll: { navbar_id: req.body.navbar_id } })
            .then(reportDetail => {
                if (reportDetail) {
                    res.json({
                        status: true,
                        message: 'Updated the report successfully'
                    });
                } else {
                    res.json({
                        status: false,
                        message: 'report not found'
                    });
                }
            }).catch(err => {
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        return res.json({
            status: false,
            message: "Invalid navbar id"
        });
    }
})

//add category to a specific report by ID
router.put('/add/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length == req.body.categoryType.length) {
            reports.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $addToSet: { categoryType: { $each: req.body.categoryType } } })
                .then(reportDetail => {
                    if (reportDetail) {
                        res.json({
                            status: true,
                            message: 'Updated the report successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'report not found'
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
        } else {
            return res.json({
                status: false,
                message: "Invalid category id"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Invalid category id / category id should be an array"
        });
    }
})

//remove category from a specific report by ID
router.put('/remove/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
    if (categoryExist.length == req.body.categoryType.length) {
        reports.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $pullAll: { categoryType: req.body.categoryType } })
            .then(reportDetail => {
                if (reportDetail) {
                    res.json({
                        status: true,
                        message: 'Updated the report successfully'
                    });
                } else {
                    res.json({
                        status: false,
                        message: 'report not found'
                    });
                }
            }).catch(err => {
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        return res.json({
            status: false,
            message: "Invalid category id"
        });
    }
})


// Delete a specific report by ID
router.delete('/:id', (req, res) => {
    reports.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: 'inactive' })
        .then(ReportDetails => {
            if (ReportDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the Report successfully'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Report not found'
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

module.exports = router;