const express = require('express')    
require('./db/mongoose')
const useRouter = require('./routers/user')
const { application } = require('express')

//connecting express server to out application.
const app  = express()       

app.use(express.json()) //automatically parse an incoming json data into object
app.use(useRouter)      //for using the router present in another file


module.exports = app