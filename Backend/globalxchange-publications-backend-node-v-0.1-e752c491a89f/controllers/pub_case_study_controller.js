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
const caseStudy = require('../models/pub_casestudy');
const category = require('../models/pub_categories');
const navbar = require('../models/pub_navbar');
var mongoose = require('mongoose');

//creating a new case study for a publication
router.post('/new', async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        if (publicationdetail) {
            if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.desc && req.body.icon && req.body.caseStudy && req.body.publication_id && req.body.coverPhoto) {
                let publisherExist = await publisher.findOne
                    ({ _id: req.body.publisher_id });
                try {
                    if (!publisherExist) {
                        return res.json({
                            status: false,
                            message: 'Publisher does not exist',
                        });
                    }
                } catch (err) {
                    return res.json({
                        status: false,
                        message: err.message,
                    });
                }
                let caseStudyExist = await caseStudy.findOne({ title: req.body.title });
                if (caseStudyExist) {
                    return res.json({
                        status: false,
                        message: 'case study already exist',
                    });
                }
                let categorydetail = await category.find({ _id: { $in: req.body.categoryType }, status: 'active' });
                let navbardetail = await navbar.find({ _id: { $in: req.body.navbar_id } });
                console.log(categorydetail.length == req.body.categoryType.length);
                if (categorydetail.length == req.body.categoryType.length && navbardetail.length == req.body.navbar_id.length) {
                    caseStudy.create({
                        publisher_id: req.body.publisher_id,
                        application_id: publicationdetail.fxa_app_id,
                        title: req.body.title,
                        desc: req.body.desc,
                        icon: req.body.icon,
                        caseStudy: req.body.caseStudy,
                        coverPhoto: req.body.coverPhoto,
                        navbar_id: req.body.navbar_id,
                        categoryType: req.body.categoryType,
                    }).then(caseStudyDetails => {
                        res.json({
                            status: true,
                            message: "Case Study created successfully",
                            data: caseStudyDetails
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

//get all case study 
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.caseId) filter._id = mongoose.Types.ObjectId(req.query.caseId);
    if (req.query.publisher_id) filter.publisher_id = mongoose.Types.ObjectId(req.query.publisher_id)
    if (req.query.publication_id) {
        let publicationExist = await publication.findOne({ _id: req.query.publication_id });
        if (publicationExist) {
            filter.application_id = mongoose.Types.ObjectId(publicationExist.fxa_app_id);
        } else {
            return res.json({
                status: false,
                message: "Publication not found"
            });
        }
    }
    if (req.query.categoryType) filter.categoryType = req.query.categoryType;
    if (req.query.navbar_id) filter.navbar_id = req.query.navbar_id;
    caseStudy.aggregate([
        {
            $match: filter
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $lookup: {
                from: "pub_categories",
                let: { "categoryType": "$categoryType" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$_id", "$$categoryType"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            categoryType: {
                                $push: "$$ROOT"
                            }
                        }
                    }

                ],
                as: "categories"
            }
        }
        ])
        .then(caseStudies => {
            if (caseStudies.length > 0) {
                res.json({
                    status: true,
                    total_count: caseStudies.length,
                    data: caseStudies
                });
            } else {
                res.json({
                    status: false,
                    message: "No case study found"
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


//get all case studies for a navbar ID's array
router.get('/navbars', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    caseStudy.find({ navbar_id: { $in: req.query.navbar }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(caseStudies => {
            if (caseStudies.length > 0) {
                res.json({
                    status: true,
                    total_count: caseStudies.length,
                    data: caseStudies
                });
            } else {
                res.json({
                    status: false,
                    message: "No case study found"
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

//get all case studies for a category ID's array
router.get('/categories', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    caseStudy.find({ categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(categoryDetail => {
            if (categoryDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: categoryDetail.length,
                    data: categoryDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No case study found"
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

//Edit case study
router.put('/:id', async (req, res) => {
    let caseStudyExist = await caseStudy.findOne({ _id: req.params.id });
    if (caseStudyExist) {
        const objForUpdate = {};
        if (req.body.title) {
            let titleExist = await caseStudy.findOne
                ({ title: req.body.title, _id: { $ne: req.params.id }, status: "active" });
            if (titleExist) {
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
        caseStudy.findOneAndUpdate({ _id: req.params.id, status: "active" }, objForUpdate)
            .then(caseStudyDetails => {
                if (caseStudyDetails) {
                    res.json({
                        status: true,
                        message: 'Updated the Case Study successfully'
                    });
                } else {
                    res.json({
                        status: false,
                        message: 'Case study not found'
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
            message: 'Case study not found'
        });
    }
})

//add navbar to case study
router.put('/add/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length == req.body.navbar_id.length) {
            caseStudy.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $addToSet: { navbar_id: { $each: req.body.navbar_id } } })
                .then(caseStudyDetails => {
                    if (caseStudyDetails) {
                        res.json({
                            status: true,
                            message: 'Add navbars to the Case Study successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'Case study not found'
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

//add category to case study
router.put('/add/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length == req.body.categoryType.length) {
            caseStudy.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $addToSet: { categoryType: { $each: req.body.categoryType } } })
                .then(caseStudyDetails => {
                    if (caseStudyDetails) {
                        res.json({
                            status: true,
                            message: 'Added categories to the Case Study successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'Case study not found'
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

//remove navbar from case study
router.put('/remove/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length == req.body.navbar_id.length) {
            caseStudy.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $pullAll: { navbar_id: req.body.navbar_id } })
                .then(caseStudyDetails => {
                    if (caseStudyDetails) {
                        res.json({
                            status: true,
                            message: 'Removed navbars from the Case Study successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'Case study not found'
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

//remove category from case study
router.put('/remove/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length == req.body.categoryType.length) {
            caseStudy.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $pullAll: { categoryType: req.body.categoryType } })
                .then(caseStudyDetails => {
                    if (caseStudyDetails) {
                        res.json({
                            status: true,
                            message: 'Removed categories from the Case Study successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'Case study not found'
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

// Delete a specific casestudy by ID
router.delete('/:id', (req, res) => {
    caseStudy.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: 'inactive' })
        .then(caseStudyDetails => {
            if (caseStudyDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the Case Study successfully'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Case study not found'
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