const express = require('express')
const router = new express.Router()  // to create new router
const User = require('../models/users')
const auth = require('../middleware/auth')
const log4js = require("log4js")


var logger = log4js.getLogger()
logger.level = "debug"


router.post('/user/signup',async (req, res) => { 

    try{
    const me = new User(req.body)

        await me.save()
        const token = await me.generatetoken()
        

        res.status(201).send({me, token})
        logger.debug("New User Signedin")
    } catch(error) {
        logger.error("Unable to signin")
        res.status(400).send(error)
    }
 
})

router.post('/user/login' ,auth, async(req, res) => {
    try{
        const user = await User.findByCredential(req.body.email , req.body.password)

        const token = await user.generatetoken()
        res.status(200).send({user, token})

        logger.debug("New User login")

        } catch(error) {
            logger.error("Unable to login")
                res.status(400).send('error occured')
        }
   
})

router.get('/user/read' , auth, async(req, res) => {
        res.send(req.user)
})

router.patch('/user/update' , auth, async(req, res) => {
    const allowedupdates = ['name' , 'age' , 'email', 'password', 'gender', 'city']
    const keyvalues = Object.keys(req.body)
    const validaton = keyvalues.every((value)=> {
        return allowedupdates.includes(value)
    })
    if(!validaton) {
        res.status(404).send('input invalid')
    }
    try {
            const user = await req.user

            keyvalues.forEach((update) =>  user[update] = req.body[update])
    
         await user.save()
         res.status(202).send(user)

         logger.debug("User updated")
    } catch(error) {
        logger.error("Unable to update")
        res.status(401).send('error is on')
    }
})

router.delete('/user/delete', auth, async(req, res) => {
    try {

        await req.user.remove()
        res.status(200).send(req.user)
        logger.debug("User deleted")
    } catch (error) {
        logger.error("Unable to delete")
        res.status(400).send(error)
    }
})

module.exports = router