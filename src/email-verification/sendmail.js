const sgmail = require('@sendgrid/mail')
const log4js = require("log4js")

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

var logger = log4js.getLogger()
logger.level = "debug"

const sendingWelcomeMail = (email, name, random) => {

   sgmail.send({
        to: email,
        from: 'parmarparth597@gmail.com',
        subject: 'welcome to our application',
        html: '<h2> welcome mr/mrs ' +name+ ' to our app let us know if u have any query regarding our application </h2> <br>' +
              '<b><h3> OTP:'+random+ '</h3></b>'
      })
      logger.debug("Email sent perfectly")
}

module.exports = {sendingWelcomeMail}

