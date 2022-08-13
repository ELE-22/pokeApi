const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const port = 3000;

//routers
const authRouters = require('./routers/auth_router').router
const teamRouters = require('./routers/team_router').router

const app = express();
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.status(200).send('Hello world!!')
})

app.use('/auth', authRouters)
app.use('/team', teamRouters)

app.listen(port, ()=>{
    console.log(`Server is runnig at port ${port}`)
}), 

exports.app= app;