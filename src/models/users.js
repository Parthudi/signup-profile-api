const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const log4js = require("log4js")
const Str = require('@supercharge/strings')

var logger = log4js.getLogger()
logger.level = "debug"

//through mongoose liberary creating the model and passing objects which are required in the database to store them.
const userSchema = new mongoose.Schema({
         name: {
                 type: String ,
                 required: true,
                 trim: true
         },
         age: {
            type: Number,
            trim: true,
            required: true,
        },
        gender: {
                type: String,
                required: true,
                trim:true
         },
         city: {
                type: String,
                default: 'vadodara',
                trim: true

         },
        email: {
                 type: String,
                 unique: true,
                 required: true,
                 trim: true,
                 lowercase: true,
                 validate(value) {
                     if(!validator.isEmail(value)) {
                         throw new Error('email is invalid')
                 }

             } 
         },
         password: {
                 type: String,
                 trim: true,
                 required: true,
                 minlength: 7,
                 validate(value) {
                
                if(value.toLowerCase().includes('password')) {
                     throw new Error('password cannot contain password')
                     }
                 }
             },
        otp: [{
            string: {
                type: String,
                required: true
         }
        }],
        tokense: [{
            token: {
                type: String,
                required: true
            }
          }],

     }, {
        timestamps: true
     })

//this is not accessible without using standard function
//hash the plain text password before saving

//checking if user updated password or not & if yes then storing the updated again in db in hashed form.
userSchema.pre('save' , async function(next) {
    const user = this   //catch each message

      if(user.isModified('password')) { 
          user.password = await bcrypt.hash(user.password, 8)
      }
        next()
})

//while signing in the user will get a token for authenticating
userSchema.methods.generatetoken = async function()  {
    const user = this
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ _id: user._id.toString() } , secret)

    user.tokense = user.tokense.concat({ token })

    await user.save()
    return token
}

userSchema.methods.generatestring = async function() {
    const user = this
    const string = Str.random(9)

    user.otp = user.otp.concat({string})

    await user.save()
   
    return string
}
 
//while login the user needs to provide email & password of a valid user who had signup.
userSchema.statics.findByCredential = async(email, password, otp) => {
    
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('unable to find user')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('login failed!!!!')
    }
     return user
}

userSchema.statics.findforget = async(email) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('unable to find user')
    }
        return user   
}

const User = mongoose.model('User', userSchema)    


 module.exports = User 