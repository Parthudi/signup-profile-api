const express = require('express')    
require('./db/mongoose')
const useRouter = require('./routers/user')


const app  = express()        //refactoring because supertest dosent work in file where listen is called & 
                             //as express application & listen call were in same file we refactore express in another file

app.use(express.json()) //automatically parse an incoming json data into object
app.use(useRouter)


module.exports = app