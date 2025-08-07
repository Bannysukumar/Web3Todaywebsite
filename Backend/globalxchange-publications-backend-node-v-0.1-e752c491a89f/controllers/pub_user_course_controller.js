const express = require('express');
const router = express.Router();

const userCourse = require("../models/pub_user_course");
const userPublication = require('../models/pub_user_publication');
const courses = require('../models/pub_courses');


router.post('/create', async (req, res) => {

    if (!req.body.email || !req.body.course_id) {
        res.json({
            status: false,
            message: 'Missing required fields'
        })
    }

    let PubUserCheck = await userCourse.findOne({ email: req.body.email, course_id: req.body.course_id });
    if (PubUserCheck) {
        return res.json({
            status: false,
            message: 'User already subscribed to this course'
        })
    }
    let publicationId
    let courseCheck = await courses.findOne({ _id: req.body.course_id });
    if (!courseCheck) {
        return res.json({
            status: false,
            message: 'Course not found'
        })
    } else {
        publicationId = courseCheck.publication_id
    }

    let userPubCheck = await userPublication.findOne({ email: req.body.email, publication_ids: publicationId });
    if (!userPubCheck) {
        return res.json({
            status: false,
            message: 'User not subscribed to this publication'
        })
    } else {
        userCourse.create({
            email: req.body.email,
            course_id: req.body.course_id
        }).then((data) => {
            res.json({
                status: true,
                message: 'Course added successfully',
                data: data
            })
        }).catch((err) => {
            res.json({
                status: false,
                message: 'Something went wrong',
                error: err
            })
        })
    }
});

router.get('/list', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status
        if (req.query.status == 'all') {
            filter = {}
        }
    } else {
        filter.status = 'active'
    }

    if(req.query.email){
        filter.email = req.query.email
    }

    if(req.query.course_id){
        filter.course_id = req.query.course_id
    }

    userCourse.find(filter).then((data) => {
        if(data.length > 0){
            res.json({
                status: true,
                message: 'Courses found',
                data: data
            })
        }else{
            res.json({
                status: false,
                message: 'No courses found',
                data: []
            })
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: 'Something went wrong',
            error: err
        })
    })
});

module.exports = router;