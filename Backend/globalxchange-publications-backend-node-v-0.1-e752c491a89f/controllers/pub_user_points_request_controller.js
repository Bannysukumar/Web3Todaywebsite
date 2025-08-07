const express = require('express');
const router = express.Router();
const publication = require('../models/pub_publication_detail');
const pubUserPointsRequest = require('../models/pub_user_points_request');
const axios = require('axios');
const userProfile = require('../models/pub_user_profile');
const mongoose = require('mongoose');


router.post('/create', async (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            status: false,
            message: "User id is required"
        })
    }
    let publicationDetail
    let convertionRate
    if (!req.body.publication_id) {
        return res.json({
            status: false,
            message: "Publication id is required"
        })
    } else {
        publicationDetail = await publication.findOne({ _id: req.body.publication_id });
        convertionRate = publicationDetail?.payoutConversionRate || 0
    }
    let finalpoints = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);

    if (finalpoints.data.status == false) {
        return res.json({
            status: false,
            message: "Data not found"
        })
    } else if (parseInt(finalpoints.data.updatedPoints) < parseInt(req.body.points_requested)) {
        return res.json({
            status: false,
            message: "You don't have enough points"
        })
    } else {
        pubUserPointsRequest.create({
            user_id: req.body.user_id,
            publication_id: req.body.publication_id,
            paymentdetails:req.body.paymentdetails,
            points_requested: req.body.points_requested,
            balance_requested: req.body.points_requested * convertionRate,
        }).then((result) => {
            return res.json({
                status: true,
                message: "Points requested successfully",
                data: result
            })
        }).catch((err) => {
            return res.json({
                status: false,
                message: "Something went wrong" + err
            })
        })
    }
})


router.get('/list', async (req, res) => {

    if (!req.query.publication_id) {
        return res.json({
            status: false,
            message: "Publication id is required"
        })
    }

    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    }
    filter.publication_id = mongoose.Types.ObjectId(req.query.publication_id)

    if (req.query.user_id) {
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id)
    }

    if(req.query.paymentdetails){
        filter.paymentdetails = req.query.paymentdetails
    }
    if (req.query.email) {
        let userDetail = await userProfile.findOne({ email: req.query.email, status: "active" })
        if (userDetail) {
            filter.user_id = userDetail._id
        } else {
            return res.json({
                status: false,
                message: "User not found"
            })
        }
    }
    if (req.query.is_approved) {
        filter.is_approved = req.query.is_approved
    }

    pubUserPointsRequest.aggregate([
        {
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_user_profiles",
                let: { "user_id": "$user_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$user_id"],
                            }
                        }
                    },
                ]
                ,
                as: "userDetail"
            }
        },
        {
            $lookup: {
                from: "pub_publication_details",
                let: { "publication_id": "$publication_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$publication_id"]
                            }
                        }
                    }
                ],
                as: "ConvertionDetail"
            }
        },
        {
            $project: {
                _id: 1,
                status: 1,
                user_id: 1,
                publication_id: 1,
                points_requested: 1,
                balance_requested: 1,
                paymentdetails:1,
                is_approved: 1,
                createdAt: 1,
                updatedAt: 1,
                "userDetail._id": 1,
                "userDetail.username": 1,
                "userDetail.email": 1,
                "userDetail.profile_pic": 1,
                "ConvertionDetail._id": 1,
                "ConvertionDetail.payoutCurrency": 1,
                "ConvertionDetail.payoutConversionRate": 1,
            }
        }
    ])
        .then((result) => {
            if (result.length == 0) {
                return res.json({
                    status: false,
                    message: "No requests found"
                })
            }
            return res.json({
                status: true,
                message: "Points requested list",
                Total_requests: result.length,
                data: result
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: "Something went wrong" + err
            })
        })
})

router.post('/update', async (req, res) => {

    pubUserPointsRequest.findOneAndUpdate({ _id: req.body._id }, { is_approved: req.body.is_approved }).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "Request not found"
            })
        }
        return res.json({
            status: true,
            message: "Request updated successfully"
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
})

module.exports = router;