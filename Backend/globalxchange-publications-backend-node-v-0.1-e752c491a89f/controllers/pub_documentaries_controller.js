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
const documentaries = require('../models/pub_documentaries');
const category = require('../models/pub_categories');
const navbar = require('../models/pub_navbar');

//creating a new documentary for a publication
router.post('/new', async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        if (publicationdetail) {
            if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.desc && req.body.icon && req.body.videoLink && req.body.publication_id && req.body.coverPhoto) {
                let publisherExist = await publisher.findOne
                    ({ _id: req.body.publisher_id });
                if (!publisherExist) {
                    return res.json({
                        status: false,
                        message: 'Publisher does not exist',
                    });
                }
                let documentaryExist = await documentaries.findOne({
                    title: req.body.title
                });
                if (documentaryExist) {
                    return res.json({
                        status: false,
                        message: 'documentary already exist',
                    });
                }
                let categorydetail = await category.find({ _id: { $in: req.body.categoryType }, status: 'active' });
                let navbardetail = await navbar.find({ _id: { $in: req.body.navbar_id } });
                // console.log(categorydetail.length == req.body.categoryType.length);
                if (categorydetail.length == req.body.categoryType.length && navbardetail.length == req.body.navbar_id.length) {
                    documentaries.create({
                        publisher_id: req.body.publisher_id,
                        application_id: publicationdetail.fxa_app_id,
                        title: req.body.title,
                        desc: req.body.desc,
                        icon: req.body.icon,
                        videoLink: req.body.videoLink,
                        coverPhoto: req.body.coverPhoto,
                        navbar_id: req.body.navbar_id,
                        categoryType: req.body.categoryType,
                    }).then(docDetails => {
                        res.json({
                            status: true,
                            message: "Documentary created successfully",
                            data: docDetails
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

//get all documentaries 
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.publisher_id) filter.publisher_id = req.query.publisher_id
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
    if (req.query.categoryType) filter.categoryType = req.query.categoryType;
    if (req.query.navbar_id) filter.navbar_id = req.query.navbar_id;
    documentaries.find(filter, null, { sort: { "createdAt": -1 } })
        .then(docDetail => {
            if (docDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: docDetail.length,
                    data: docDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No documentaries found"
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

//get all documentaries for a navbar ID's array
router.get('/navbars', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    documentaries.find({ navbar_id: { $in: req.query.navbar }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(docDetail => {
            if (docDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: docDetail.length,
                    data: docDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No documentaries found"
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

//get all documentaries for a category ID's array
router.get('/categories', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    documentaries.find({ categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(docDetail => {
            if (docDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: docDetail.length,
                    data: docDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No documentaries found"
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

//Edit a specific documentary by ID
router.put('/:id', async (req, res) => {
    let documentaryExist = await documentaries.findOne({ _id: req.params.id });
    if (documentaryExist) {
        const objForUpdate = {};
        if (req.body.title) {
            let titleExist = await documentaries.findOne
                ({ title: req.body.title, _id: { $ne: req.params.id } });
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
        if (req.body.videoLink) objForUpdate.videoLink = req.body.videoLink;
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
        documentaries.findOneAndUpdate({ _id: req.params.id }, objForUpdate)
            .then(docDetails => {
                if (docDetails) {
                    res.json({
                        status: true,
                        message: 'Updated the documentary successfully'
                    });
                } else {
                    res.json({
                        status: false,
                        message: 'documentary not found'
                    });
                }
            }).catch(err => {
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        res.json({
            status: false,
            message: "documentary not found"
        });
    }
});

//add navbar to a specific documentary by ID
router.put('/add/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length == req.body.navbar_id.length) {
            documentaries.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $addToSet: { navbar_id: { $each: req.body.navbar_id } } })
                .then(docDetail => {
                    if (docDetail) {
                        res.json({
                            status: true,
                            message: 'Added navbars to the documentary successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'documentary not found'
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

//remove navbar from a specific documentary by ID
router.put('/remove/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id } });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length == req.body.navbar_id.length) {
            documentaries.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $pull: { navbar_id: { $in: req.body.navbar_id } } })
                .then(docDetail => {
                    if (docDetail) {
                        res.json({
                            status: true,
                            message: 'Removed navbars from the documentary successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'documentary not found'
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

//add category to a specific documentary by ID
router.put('/add/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length == req.body.categoryType.length) {
            documentaries.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $addToSet: { categoryType: { $each: req.body.categoryType } } })
                .then(docDetail => {
                    if (docDetail) {
                        res.json({
                            status: true,
                            message: 'Added category to the documentary successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'documentary not found'
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

//remove category from a specific documentary by ID
router.put('/remove/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType } });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length == req.body.categoryType.length) {
            documentaries.findOneAndUpdate({ _id: req.params.id, status: "active" }, { $pull: { categoryType: { $in: req.body.categoryType } } })
                .then(docDetail => {
                    if (docDetail) {
                        res.json({
                            status: true,
                            message: 'Removed category from the documentary successfully'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'documentary not found'
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

// Delete a specific documentarys by ID
router.delete('/:id', (req, res) => {
    documentaries.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: 'inactive' })
        .then(docDetails => {
            if (docDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the documentary successfully'
                });
            } else {
                res.json({
                    status: false,
                    message: 'documentaries not found'
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