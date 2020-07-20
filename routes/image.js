const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

router.get('/:id', (req, res) => {

    Photo.findById(req.params.id, (error, image) => {
        if (error) {
            console.log(error)
        } else {
            console.log(image)
            res.render('single_image', {
                image: image
            })
        }
    })
})

// route to handle put request
router.put('/:id', (req, res) => {

    Photo.updateOne({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name
        }
    }, {
        upsert: true
    }, (err, image) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })

})

// Delete route
router.delete('/:id', (req, res) => {

    Photo.deleteOne({
        _id: req.params.id
    }, (error) => {
        if (error) {
            console.log(error)
        }
        res.send('Success')
    })
})



module.exports = router;