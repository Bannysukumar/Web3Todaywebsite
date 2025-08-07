const express = require('express');
const router = express.Router();

const pubaffiliatepoints = require('../models/pub_affiliate_points_data');

const publication = require('../models/pub_publication_detail');

const userProfile = require('../models/pub_user_profile');
const userPublication = require('../models/pub_user_publication');

const axios = require('axios');

router.post('/create', async (req, res) => {
    let publicationDetail = await publication.findOne({
        _id: req.body.publication_id
    });
    if (!publicationDetail) {
        return res.json({
            status: false,
            message: "Publication not found"
        })
    } 
    // let PubAffiliateDetail = await pubaffiliatepoints.findOne({ userEmail: req.body.userEmail, publication_id: req.body.publication_id });
    // if (PubAffiliateDetail) {
    //     return res.json({
    //         status: false,
    //         message: "points already added"
    //     })
    // }
    const uplineData = await axios.get(`https://comms.globalxchange.io/brokerage/stats/get/uplines?email=${req.body.userEmail}`);

    if (!uplineData.data.status) {
        return res.json({
            status: false,
            message: "Upline not found"
        })
    } else {
        // console.log(affiliatePointsData)
        //add points to each user in upline
        //await Promise.all(records.map(record => Record.create(record)));
        const results = await Promise.all(uplineData.data.uplines.map(async (upline, index) => {
            let user = await userPublication.findOne({
                email: upline.email,
                publication_ids: req.body.publication_id
            });
            let affiliateDetail = await pubaffiliatepoints.findOne({ userEmail: req.body.userEmail, email: upline.email, publication_id: req.body.publication_id });
            if (!affiliateDetail) {
                if (user) {
                    let affiliatePoints = new pubaffiliatepoints({
                        email: upline.email,
                        points: publicationDetail.ddsLevel[index],
                        publication_id: req.body.publication_id,
                        userEmail: req.body.userEmail,
                        message: "Added points for user registration",
                        dds: upline.dds,
                        is_registered: true
                    });
                    await affiliatePoints.save();
                } else {
                    let affiliatePoints = new pubaffiliatepoints({
                        email: upline.email,
                        points: publicationDetail.ddsLevel[index],
                        publication_id: req.body.publication_id,
                        userEmail: req.body.userEmail,
                        message: "Added points for user registration",
                        dds: upline.dds,
                        is_registered: false
                    });
                    await affiliatePoints.save();
                }
            }
        }))

        // console.log(results)

        res.json({
            status: true,
            data: "Points added to affiliate's successfully"
        });
    }
});

router.get('/list', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }
    if (req.query.email) {
        filter.email = req.query.email;
    }
    if (req.query.userEmail) {
        filter.userEmail = req.query.userEmail;
    }
    if (req.query.is_registered) {
        filter.is_registered = req.query.is_registered;
    }
    let affiliatePointsData = await pubaffiliatepoints.find(filter);
    res.json({
        status: true,
        total_users: affiliatePointsData.length,
        data: affiliatePointsData
    });
});

router.delete('/delete', async (req, res) => {
    //empty collection
    await pubaffiliatepoints.deleteMany({});
    res.json({
        status: true,
        data: "All points deleted successfully"
    });
});

module.exports = router;