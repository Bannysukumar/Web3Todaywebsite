const express = require('express');
const router = express.Router();
const axios = require('axios');

const userDetails = require('../models/pub_user_profile');
const publicationDetails = require('../models/pub_publication_detail');
const signUpUserPoints = require('../models/pub_user_signup_points');

router.post('/', async (req, res) => {
  let userData = await userDetails.findOne({ _id: req.body.user_id });
  if (!userData) {
    return res.json({
      status: false,
      message: 'User not found'
    })
  }

  let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
  if (!publicationData) {
    return res.json({
      status: false,
      message: 'Publication not found'
    })
  }

  let userSignUpData = await signUpUserPoints.findOne({ user_id: req.body.user_id, publication_id: req.body.publication_id });
  if (userSignUpData) {
    return res.json({
      status: false,
      message: 'User already added'
    })
  }

  let previousBalance = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);
    if (previousBalance.data.status == false) {
        previousBalance = 0
    } else {
        previousBalance = previousBalance.data.totalPoints
    }


  signUpUserPoints.create({
    user_id: req.body.user_id,
    publication_id: req.body.publication_id,
    points: publicationData.signUpBonus,
  }).then((data) => {
    return res.json({
      status: true,
      message: 'Added signup points to user',
      previousBalance,
      newBalance: parseInt(previousBalance) + parseInt(publicationData.signUpBonus)
    })
  }).catch((err) => {
    return res.json({
      status: false,
      message: 'Error while adding user points'
    })
  })
})

//get user points
router.get('/', async (req, res) => {
  let filter = {}
  if (req.query.status) {
    filter.status = req.query.status;
    if (req.query.status == "all")
      filter = {};
  } else {
    filter.status = "active";
  }

  if (req.query.user_id) {
    filter.user_id = req.query.user_id;
  }

  if (req.query.publication_id) {
    filter.publication_id = req.query.publication_id;
  }

  signUpUserPoints.find(filter, null, { sort: { "createdAt": -1 } })
    .then((data) => {
      if (data.length > 0) {
        return res.json({
          status: true,
          data: data
        })
      } else {
        return res.json({
          status: false,
          message: 'No data found'
        })
      }
    }).catch((err) => {
      return res.json({
        status: false,
        message: 'Error while fetching user points'
      })
    })
})

module.exports = router;