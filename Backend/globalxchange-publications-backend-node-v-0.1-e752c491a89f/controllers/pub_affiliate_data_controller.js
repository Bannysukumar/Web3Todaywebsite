const express = require('express');
const router = express.Router();
const PubAffiliateData = require('../models/pub_affiliate_data');
const publication = require('../models/pub_publication_detail');
const axios = require('axios');

router.post('/create', async (req, res) => {

    let publicationDetail = await publication.findOne({ _id: req.body.publication_id });
    if (!publicationDetail) {
        return res.json({
            status: false,
            message: "Publication not found"
        })
    }

    let PubAffiliateDetail = await PubAffiliateData.findOne({ email: req.body.email, publication_id: req.body.publication_id });
    if (PubAffiliateDetail) {
        return res.json({
            status: false,
            message: "Upline already exists"
        })
    }

    const uplineData = await axios.get(`https://comms.globalxchange.io/brokerage/stats/get/uplines?email=${req.body.userEmail}`);

    if (!uplineData.data.status) {
        return res.json({
            status: false,
            message: "Upline not found"
        })
    } else {
        PubAffiliateData.create({
            userEmail: req.body.userEmail,
            uplines: uplineData.data.uplines,
            publication_id: req.body.publication_id,
        }).then(pubAffiliateData => {
            res.json({
                status: true,
                data: "Created upline data to publication successfully"
            });
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            });
        });
    }
});

router.get("/list", async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.email) {
        filter.email = req.query.email;
    }
    if(req.query.userEmail){
        filter.userEmail = req.query.userEmail;
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }
    PubAffiliateData.find(filter).then(pubAffiliateData => {
        if (pubAffiliateData.length > 0) {
            res.json({
                status: true,
                data: pubAffiliateData
            })
        } else {
            res.json({
                status: false,
                message: "No data found"
            })
        }
    }).catch(err => {
        res.json({
            status: false,
            message: err.message
        });
    });
})

router.delete('/delete', async (req, res) => {
    //empty collection
    await PubAffiliateData.deleteMany({});
    res.json({
        status: true,
        data: "All points deleted successfully"
    });
});

module.exports = router;