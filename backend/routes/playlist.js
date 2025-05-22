const router = require('express').Router();

router
.route('/playlist')
.post((req, res) => {
    console.log("hello" + req.body.playlistName)
    res.json(req.body).status(200).send();
})