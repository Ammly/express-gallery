const express = require('express');
const Photo = require('../models/photo');

const router = express.Router();
const upload = require('../upload');

// Home page router
router.get('/', (req, res) => {
    Photo.find({}, (error, images) => {
        if (error) {
            console.log(error);
        } else {

            res.render('index', {
                images: images,
                msg: req.query.msg
            });
        }
    })
})

// route to handle image upload
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            // Redirect to the index page and pass a msg to the template
            res.render('index', {
                msg: `${err}`
            })

        } else if (req.file === undefined) {
            // Redirect to the index page and pass a msg to the template
            res.render('index', {
                msg: 'Error: No file selected!!'
            })
        } else {
            // Create a new photo
            let newPhoto = new Photo({
                name: req.file.filename,
                path: 'images/' + req.file.filename,
                size: req.file.size
            })

            // Save newPhoto in the database
            newPhoto.save()

            // Redirect to the index page and pass a msg to the template
            res.redirect('/')
        }
    })
})

module.exports = router;