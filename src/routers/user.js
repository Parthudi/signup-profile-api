const express = require('express')
const router = new express.Router()  // to create new router
const User = require('../models/users')
const {auth} = require('../middleware/auth')
const log4js = require("log4js")
const {sendingWelcomeMail} = require('../email-verification/sendmail')

var logger = log4js.getLogger()
logger.level = "debug"

//Its compulsary all the user once need to signup. & generate the token.
router.post('/user/signup', async (req, res) => { 

    try{
    const me = new User(req.body)

        await me.save()

        const generatestr = await me.generatestring()
       
        sendingWelcomeMail(me.email, me.name,  generatestr)

        const token = await me.generatetoken()
        
        res.status(201).send({me, token})
        logger.debug("New User Signedin")

    } catch(error) {
        logger.error("Unable to signin")
        res.status(400).send(error)
    }
 
})

//user performs login by providing email & password of user who had signed in.
router.post('/user/login' ,auth, async(req, res) => {
    try{
       const user = await User.findByCredential(req.body.email , req.body.password ,req.body.otp)
       const dbstring = user.otp[0].string

        if(req.body.otp ===  dbstring) {
            const token = await user.generatetoken()
      
        res.status(200).send({user, token})
   
         logger.debug("New User login")
        }
        else{
            res.status(400).send('Wrong OTP')
            logger.debug("Wrong Otp")
        }
 } catch(error) {
            logger.error("Unable to login")
                res.status(400).send('error occured')
        }
   
})

router.patch('/user/forget', async(req, res) => {
    const allowedupdates = ['email', 'password']
    const keyvalues = Object.keys(req.body)
    const validaton = keyvalues.every((value)=> {
        return allowedupdates.includes(value)
    })
    if(!validaton) {
        res.status(404).send('input invalid')
    }

    try {
        const user = await User.findforget(req.body.email)
        
        logger.debug("User found")
        if(!user) {
           throw new Error('sorry no user found!! ')
            }
           
        keyvalues.forEach((update) =>  user[update] = req.body[update])
    
            await user.save()
            res.status(202).send(user)
   
            logger.debug("Password updated")

        }  catch(error) {
        res.status(400).send('Unable to forget')
    }
})
//for reading the data of the authenticated user only.
router.get('/user/read' , auth, async(req, res) => {
        res.send(req.user)
})


//to update any value stored in the database.
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

//this will delete the user from database & user can no more perform activities.
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