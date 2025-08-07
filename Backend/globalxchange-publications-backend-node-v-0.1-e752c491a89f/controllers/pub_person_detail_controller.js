const express = require('express');
const router = express.Router();

const pubPerson = require('../models/pub_person_detail');
const publication = require('../models/pub_publication_detail');

// Create a founder record
router.post('/', async (req, res) => {
    if (!req.body.publication_id || !req.body.name) {
        return res.json({
            status: false,
            message: "Publication id and name are required"
        });
    }
    let publicationExist = await publication.findOne
        ({ _id: req.body.publication_id, status: 'active' });
    if (!publicationExist) {
        return res.json({
            status: false,
            message: "Publication not found"
        });
    }

    let personExist = await pubPerson.findOne
        ({
            name: req.body.name,
            status: 'active'
        });
    if (personExist) {
        return res.json({
            status: false,
            message: "Person already exist"
        });
    }
    pubPerson.create({
        name: req.body.name,
        username: req.body.username,
        country: req.body.country,
        gender: req.body.gender,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        description: req.body.description,
        bio: req.body.bio,
        current_company: req.body.current_company,
        current_job_title: req.body.current_job_title,
        current_job_category: req.body.current_job_category,
        currently_affiliated_company: req.body.currently_affiliated_company,
        previous_affiliated_company: req.body.previous_affiliated_company,
        profile_pic: req.body.profile_pic,
        cover_pic: req.body.cover_pic,
        publication_id: req.body.publication_id,
    }).then(personDetail => {
        res.json({
            status: true,
            data: personDetail
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: true,
            message: err.message
        });
    });

});

// Get all founders based on fiter query
router.get('/', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.country)
        filter.country = req.query.country;
    if (req.query.publication_id)
        filter.publication_id = req.query.publication_id;
    pubPerson.find(filter, null, { sort: { "createdAt": -1 } }).then(personDetail => {
        if(personDetail.length == 0){
            return res.json({
                status: false,
                message: "No record found"
            });
        }
        res.json({
            status: true,
            total_count: personDetail.length,
            data: personDetail
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: true,
            message: err.message
        });
    });
});

// Get a specific founder by ID
router.get('/:id', (req, res) => {
    pubPerson.findOne({ _id: req.params.id }).then(personDetail => {
        if(!personDetail){
            return res.json({
                status: false,
                message: "No record found"
            });
        }
        res.json({
            status: true,
            data: personDetail
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: true,
            message: err.message
        });
    });
});

// Update a founder by ID
router.put('/:id', async (req, res) => {
    const objForUpdate = {};
    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.username) objForUpdate.username = req.body.username;
    if (req.body.country) objForUpdate.country = req.body.country;
    if (req.body.gender) objForUpdate.gender = req.body.gender;
    if (req.body.linkedin) objForUpdate.linkedin = req.body.linkedin;
    if (req.body.twitter) objForUpdate.twitter = req.body.twitter;
    if (req.body.instagram) objForUpdate.instagram = req.body.instagram;
    if (req.body.email) objForUpdate.email = req.body.email;
    if (req.body.phone) objForUpdate.phone = req.body.phone;
    if (req.body.website) objForUpdate.website = req.body.website;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.bio) objForUpdate.bio = req.body.bio;
    if (req.body.current_company) objForUpdate.current_company = req.body.current_company;
    if (req.body.current_job_title) objForUpdate.current_job_title = req.body.current_job_title;
    if (req.body.current_job_category) objForUpdate.current_job_category = req.body.current_job_category;
    if (req.body.currently_affiliated_company) objForUpdate.currently_affiliated_company = req.body.currently_affiliated_company;
    if (req.body.previous_affiliated_company) objForUpdate.previous_affiliated_company = req.body.previous_affiliated_company;
    if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
    if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
    if (req.body.publication_id) {
        publicationExist = await publication.findOne({
            _id: req.body.publication_id
        });
        if (publicationExist) {
            objForUpdate.publication_id = req.body.publication_id;
        } else {
            res.json({
                status: false,
                message: "Publication does not exist"
            });
        }
    }

    pubPerson.updateOne({ _id: req.params.id }, objForUpdate).then(personDetail => {
        res.json({
            status: true,
            message: "successfully update"
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: true,
            message: err.message
        });
    });
});

// Delete a specific founder by ID
router.delete('/:id', (req, res) => {
    const objForUpdate = {};
    objForUpdate.status = 'inactive';
    pubPerson.findOneAndUpdate({ _id: req.params.id, status:"active" }, objForUpdate).then(personDetail => {
        if(!personDetail){
            return res.json({
                status: false,
                message: "No record found"
            });
        }
        res.json({
            status: true,
            message: "Deleted the Record"
        });
    }).catch(err => {
        console.log("err======>", err);
        res.json({
            status: true,
            message: err.message
        });
    });
});

module.exports = router;