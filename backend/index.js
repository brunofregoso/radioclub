const express = require('express');
const pgp = require('pg-promise')();
const app = express();
const port = 3000;
const userRouter = require('./routes/users');



app.listen(port, () => {
  console.log("server running and listening on port " + port);
})


app.use(express.json())
app.use('/api', userRouter);

module.exports = app;