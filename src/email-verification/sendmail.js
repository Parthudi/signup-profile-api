const sgmail = require('@sendgrid/mail')


sgmail.setApiKey(process.env.SENDGRID_API_KEY)


const sendingWelcomeMail = (email, name, random) => {

   sgmail.send({
        to: email,
        from: 'parmarparth597@gmail.com',
        subject: 'welcome to our application',
        html: '<h2> welcome mr/mrs ' +name+ ' to our app let us know if u have any query regarding our application </h2> <br>' +
              'OTP: '+random
                
        })
}

module.exports = {sendingWelcomeMail}

