const router = require("express").Router();
const prefix = "/user"

const data = [
    {
        id: 1,
        name: "John Doe",
        email: "lel@lel.com",
    }
    ,
    {
        id: 2,
        name: "Jane Doe",
        email: "s@com",
    }

]

router
  .route(`${prefix}/login`)
  .post((req, res) => {
    console.log("Logging in user: " + req.body.username)
    console.log("with password: " + req.body.password)
    if (req.body.username && req.body.password) {
      res.json(req.body).status(200).send();
    }
    else {
      res.status(400).send("Bad Request");
    }
  })



router
  .route(`${prefix}/getFriends`)
  .get((req, res) => {
    res.json(data).status(200).send();
  })

module.exports = router;
