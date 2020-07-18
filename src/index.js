const app = require('./app')
var log4js = require("log4js");


const port = process.env.PORT   //for deployment to heroku

var logger = log4js.getLogger();
logger.level = "debug";

app.listen(port, () => {           //refactoring because supertest dosent work in file where listen is called
    logger.debug("Server is running on: " +port);
})
