const express = require('express');
const router = express.Router();
const pubUserRedeemPoints = require('../models/pub_user_redeem_points')
const publication = require('../models/pub_publication_detail');
const axios = require('axios');


router.post('/user', async (req, res) => {
    if(!req.body.user_id){
        return res.json({
            status: false,
            message: "User id is required"
        })
    }
    let publicationDetail
    let convertionRate
    if(!req.body.publication_id){
        return res.json({
            status: false,
            message: "Publication id is required"
        })
    }else{
        publicationDetail = await publication.findOne({_id: req.body.publication_id});
        convertionRate = publicationDetail?.payoutConversionRate || 0
    }
    let finalpoints = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);
    if (finalpoints.data.status == false) {
        return res.json({
            status: false,
            message: "Data not found"
        })
    } else if (parseInt(finalpoints.data.updatedPoints) < parseInt(req.body.converted_points)) {
        return res.json({
            status: false,
            message: "You don't have enough points"
        })
    } else {
        pubUserRedeemPoints.create({
            user_id: req.body.user_id,
            publication_id: req.body.publication_id,
            converted_points: req.body.converted_points,
            converted_balance: req.body.converted_points * convertionRate,
        }).then((result) => {
            return res.json({
                status: true,
                message: "Points redeemed successfully",
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

module.exports = router;