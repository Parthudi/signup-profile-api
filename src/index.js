const app = require('./app')
var log4js = require("log4js");


const port = process.env.PORT   //for deployment to heroku

var logger = log4js.getLogger();
logger.level = "debug";

//this will listen to the application and start the server.
app.listen(port, () => {           
    logger.debug("Server is running on: " +port);
})
