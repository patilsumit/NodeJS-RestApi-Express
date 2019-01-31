/*
 * Title: Course API Implementaion using express. Routes are split in individual files.
 * Description:
 * We are using following built-in middleware functions
 * 1. express.json() 
 *    It parses incoming requests with JSON payloads and is based on body-parser.
 *    This middleware is available in Express v4.16.0 onwards.
 * 
 * 2. express.urlencoded()
 *    It parses incoming requests with urlencoded payloads
 *    and is based on body-parser.
 */

// Import Express
const express = require('express');
const app = express();
const morgan = require('morgan'); // Logging

const courses = require('./routes/courses');
const home = require('./routes/home');
const cors = require('cors')


//Use json middleware
app.use(express.json());
// Use the urlencoded middleware from express
// Parses request body in this form: key1=value1&key2=value2,
// and construct a json object
app.use(express.urlencoded({extended: true}));

app.use(morgan('tiny'));

// Allow Cross Orgin Resource Sharing (Enable CORS)
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

app.use(cors());

// Use the route
app.use('/api/courses', courses);
app.use('/', home);

// Read PORT from env if set
const port = process.env.HTTP_PORT || 5000;
//listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
