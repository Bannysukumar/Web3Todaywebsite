const express = require('express');
const mongoose = require('mongoose');
const publishers = require('../models/pub_publisher_detail');
const webinars = require('../models/pub_webinar');
const category = require('../models/pub_categories');
const publication = require('../models/pub_publication_detail');
const navbar = require('../models/pub_navbar');
const router = express.Router();
const isValidDateFormat = (dateString) => {
    // Regular expression to match the DD/MM/YYYY format
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;

    // Check if the input string matches the date pattern
    return datePattern.test(dateString);
}


//add a new webinar

router.post('/add', async (req, res) => {
    if (!req.body.title) {
        return res.json({
            status: false,
            message: "title can not be empty"
        })
    } else {
        let titleCheck = await webinars.findOne({ title: req.body.title, status: 'active' });
        if (titleCheck) {
            return res.json({
                status: false,
                message: "title already exist"
            })
        }
    }
    if (!req.body.publication_id) {
        return res.json({
            status: false,
            message: "publication id can not be empty"
        });
    } else {
        let PublicationDetail = await publication.findOne({ _id: req.body.publication_id, status: 'active' });
        if (!PublicationDetail) {
            return res.json({
                status: false,
                message: "publication id not found"
            });
        }
    }
    if (!req.body.category) {
        return res.json({
            status: false,
            message: "category can not be empty"
        })
    }

    if (!req.body.navbar) {
        return res.json({
            status: false,
            message: "navbar can not be empty"
        })
    }

    //add validation for date as "DD/MM/YYYY"
    if (!req.body.date) {
        return res.json({
            status: false,
            message: "date can not be empty"
        })
    } else {
        if (!isValidDateFormat(req.body.date)) {
            return res.json({
                status: false,
                message: "date format should be DD-MM-YYYY"
            })
        }
    }

    let categorydetail = await category.find({ _id: { $in: req.body.category }, status: 'active' });
    let navbardetail = await navbar.find({ _id: { $in: req.body.navbar }, status: 'active' });



    if (categorydetail.length != req.body.category.length) {
        return res.json({
            status: false,
            message: "category not found"
        });
    }

    if (navbardetail.length != req.body.navbar.length) {
        return res.json({
            status: false,
            message: "navbar not found"
        });
    }

    if (!req.body.email) {
        return res.json({
            status: false,
            message: "email can not be empty"
        })
    } else {
        let emailCheck = await publishers.findOne({ email: req.body.email, status:"active" });
        if (!emailCheck) {
            return res.json({
                status: false,
                message: "only publisher can add webinar"
            })
        }
    }

    webinars.create({
        publication_id: req.body.publication_id,
        email: req.body.email,
        image: req.body.image,
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
        registrationLink: req.body.registrationLink,
        costStructure: req.body.costStructure,
        cost: req.body.cost,
        currency: req.body.currency,
        category: req.body.category,
        navbar: req.body.navbar,
        recordingStatus: req.body.recordingStatus,
        hostName: req.body.hostName,
        hostImage: req.body.hostImage,
        hostBio: req.body.hostBio,
    }).then((data) => {
        return res.json({
            status: true,
            message: "webinar added successfully",
            data: data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong"
        });
    });
});


//get webinar list
router.get('/list', async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.webinar_id) filter._id = mongoose.Types.ObjectId(req.query.webinar_id);
    if (req.query.publication_id) filter.publication_id = mongoose.Types.ObjectId(req.query.publication_id);
    if (req.query.email) filter.email = req.query.email;
    if (req.query.title) filter.title = req.query.title;
    if (req.query.date) filter.date = req.query.date;
    if (req.query.costStructure) filter.costStructure = req.query.costStructure;
    if (req.query.currency) filter.currency = req.query.currency;
    if (req.query.category) {
        filter.category = { $in: req.query.category };
    }
    if (req.query.navbar) {
        filter.navbar = { $in: req.query.navbar };
    }
    if (req.query.recordingStatus) filter.recordingStatus = req.query.recordingStatus;
    if (req.query.hostName) filter.hostName = req.query.hostName;
    if (req.query.hostImage) filter.hostImage = req.query.hostImage;
    if (req.query.hostBio) filter.hostBio = req.query.hostBio;
    if (req.query.upcomingWebinars) {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('en-GB');
        filter.date = { $gte: currentDateString };
    }
    webinars.find(filter).then((data) => {
        if (!data || data.length == 0) {
            return res.json({
                status: false,
                message: "webinar not found"
            });
        }
        return res.json({
            status: true,
            total: data.length,
            message: "webinar list",
            data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong"
        });
    });
});


//edit webinar

router.put('/update/:id', async (req, res) => {
    let objForUpdate = {};
    if (req.body.publication_id) {
        let PublicationDetail = await publication.findOne({ _id: req.body.publication_id, status: 'active' });
        if (!PublicationDetail) {
            return res.json({
                status: false,
                message: "publication not found"
            });
        }
        objForUpdate.publication_id = req.body.publication_id;
    }
    if (req.body.email) {
        let emailCheck = await publishers.findOne({ email: req.body.email, status:"active" });
        if (!emailCheck) {
            return res.json({
                status: false,
                message: "only publisher can add webinar"
            })
        }
        objForUpdate.email = req.body.email;
    }
    if (req.body.image) {
        objForUpdate.image = req.body.image;
    }
    if (req.body.title) {
        let titleCheck = await webinars.findOne({ title: req.body.title, _id: { $ne: mongoose.Types.ObjectId(req.params.id) }, status: 'active' });
        if (titleCheck) {
            return res.json({
                status: false,
                message: "title already exist"
            });
        }
        objForUpdate.title = req.body.title;
    }
    if (req.body.date) {
        objForUpdate.date = req.body.date;
    }
    if (req.body.startTime) {
        objForUpdate.startTime = req.body.startTime;
    }
    if (req.body.endTime) {
        objForUpdate.endTime = req.body.endTime;
    }
    if (req.body.description) {
        objForUpdate.description = req.body.description;
    }
    if (req.body.registrationLink) {
        objForUpdate.registrationLink = req.body.registrationLink;
    }
    if (req.body.costStructure) {
        objForUpdate.costStructure = req.body.costStructure;
    }
    if (req.body.cost) {
        objForUpdate.cost = req.body.cost;
    }
    if (req.body.currency) {
        objForUpdate.currency = req.body.currency;
    }
    if(req.body.recordingStatus){
        objForUpdate.recordingStatus = req.body.recordingStatus;
    }
    if (req.body.hostName) {
        objForUpdate.hostName = req.body.hostName;
    }
    if (req.body.hostImage) {
        objForUpdate.hostImage = req.body.hostImage;
    }
    if (req.body.hostBio) {
        objForUpdate.hostBio = req.body.hostBio;
    }
    if (req.body.category) {
        let categorydetail = await category.find({ _id: { $in: req.body.category }, status: 'active' });
        if (categorydetail.length != req.body.category.length) {
            return res.json({
                status: false,
                message: "category not found"
            });
        }
        objForUpdate.category = req.body.category;
    }
    if (req.body.navbar) {
        let navbardetail = await navbar.find({ _id: { $in: req.body.navbar }, status: 'active' });
        if (navbardetail.length != req.body.navbar.length) {
            return res.json({
                status: false,
                message: "navbar not found"
            });
        }
        objForUpdate.navbar = req.body.navbar;
    }
   console.log(objForUpdate);
    webinars.findOneAndUpdate({ _id: req.params.id, status:"active" }, objForUpdate, { new: true }).then((data) => {
        if (!data) {
            return res.json({
                status: false,
                message: "webinar not found"
            });
        }
        return res.json({
            status: true,
            message: "webinar updated successfully",
            data: data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong"
        });
    });

});

//delete webinar
router.delete('/delete/:id', async (req, res) => {
    webinars.findOneAndUpdate({ _id: req.params.id, status:"active" }, { $set: { status: 'inactive' } }, { new: true }).then((data) => {
        if (!data) {
            return res.json({
                status: false,
                message: "webinar not found"
            });
        }
        return res.json({
            status: true,
            message: "webinar deleted successfully",
            data: data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong"
        });
    });
});

module.exports = router;