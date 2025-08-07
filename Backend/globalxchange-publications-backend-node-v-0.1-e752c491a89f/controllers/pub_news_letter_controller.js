const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pubNews = require('../models/pub_news_letter');
const publication = require('../models/pub_publication_detail');


//create a new news letter
router.post('/create', async (req, res) => {
    if (!req.body.publication_id) {
        return res.send({
            status: false,
            message: "publication id can not be empty"
        });
    } else {
        let PublicationDetail = await publication.findOne({ _id: req.body.publication_id, status: 'active' });
        if (!PublicationDetail) {
            return res.send({
                status: false,
                message: "publication id is invalid"
            });
        }
        if (req.body.email) {
            let EmailCheck = await publication.findOne({ email: req.body.email, status: 'active' });
            if (!EmailCheck) {
                return res.send({
                    status: false,
                    message: "Only publication owner can create news letter"
                });
            }
        } else {
            return res.send({
                status: false,
                message: "Email can not be empty"
            });
        }
    }

    pubNews.create({
        publication_id: req.body.publication_id,
        email: req.body.email,
        nameOfNewsLetter: req.body.nameOfNewsLetter,
        icon: req.body.icon,
        description: req.body.description,
        colourCode: req.body.colourCode,
        frequency: req.body.frequency,
        type: req.body.type,
        currency: req.body.currency,
        billingFrequency: req.body.billingFrequency,
        costPerFrequency: req.body.costPerFrequency
    }, (err, data) => {
        if (err) {
            res.send({
                status: false,
                message: err
            });
        } else {
            res.send({
                status: true,
                message: "News Letter Created Successfully",
                data: data
            });
        }
    })
});

//get all news letter 
router.get('/list', async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == 'all') {
            delete filter.status;
        }
    } else {
        filter.status = 'active';
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }
    if (req.query.email) {
        filter.email = req.query.email;
    }
    if (req.query.type) {
        filter.type = req.query.type;
    }
    if (req.query.frequency) {
        filter.frequency = req.query.frequency;
    }
    if (req.query.billingFrequency) {
        filter.billingFrequency = req.query.billingFrequency;
    }
    if (req.query.costPerFrequency) {
        filter.costPerFrequency = req.query.costPerFrequency;
    }
    if (req.query.currency) {
        filter.currency = req.query.currency;
    }
    if (req.query.nameOfNewsLetter) {
        filter.nameOfNewsLetter = req.query.nameOfNewsLetter;
    }
    if (req.query.icon) {
        filter.icon = req.query.icon;
    }
    if (req.query.description) {
        filter.description = req.query.description;
    }
    if (req.query.colourCode) {
        filter.colourCode = req.query.colourCode;
    }
    pubNews.find(filter, (err, data) => {
        if (err) {
            res.send({
                status: false,
                message: err
            });
        } else {
            if (data.length == 0) {
                return res.send({
                    status: false,
                    message: "No News Letter Found"
                });
            }
            res.send({
                status: true,
                message: "News Letter List",
                data: data
            });
        }
    }).catch(err => {
        res.send({
            status: false,
            message: err
        });
    });
});

router.put('/update/:id', async (req, res) => {
    let newsletterExist = await pubNews.findOne({ _id: req.params.id });
    if (!newsletterExist) {
        return res.json({
            success: false,
            message: "Newsletter not found"
        })
    }
    const objForUpdate = {}
    if (req.body.nameOfNewsLetter) {
        let newsletterExist = await pubNews.findOne
            ({ nameOfNewsLetter: req.body.nameOfNewsLetter, _id: { $ne: req.params.id }, status: "active" });
        if (newsletterExist) {
            return res.json({
                status: false,
                message: "Newsletter already exist"
            });
        }
        objForUpdate.nameOfNewsLetter = req.body.nameOfNewsLetter;
    }
    if(req.body.icon)objForUpdate.icon = req.body.icon
    if(req.body.description) objForUpdate.description = req.body.description
    if(req.body.colourCode) objForUpdate.colourCode = req.body.colourCode
    if(req.body.frequency) objForUpdate.frequency = req.body.frequency
    if(req.body.type) objForUpdate.type = req.body.type
    if(req.body.currency) objForUpdate.currency = req.body.currency
    if(req.body.billingFrequency) objForUpdate.billingFrequency = req.body.billingFrequency
    if(req.body.costPerFrequency) objForUpdate.costPerFrequency = req.body.costPerFrequency
    pubNews.findOneAndUpdate({ _id: req.params.id, status: "active" }, objForUpdate)
    .then(newsLetterDetail => {
        if (newsLetterDetail) {
            res.json({
                status: true,
                message: 'Updated the newsletter successfully'
            });
        } else {
            res.json({
                status: false,
                message: 'newsletter not found'
            });
        }
    }).catch(err => {
        console.log('err=========>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
})

router.delete('/delete/:id', (req, res) => {
    pubNews.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: 'inactive' })
        .then(newsLetterDetails => {
            if (newsLetterDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the newsletter successfully'
                });
            } else {
                res.json({
                    status: false,
                    message: 'newsletter not found'
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