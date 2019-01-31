/*
 * Title: Course API Implementaion using express
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

// Import joi for schema validation
const Joi = require('joi');

//Use json middleware
app.use(express.json());
// Use the urlencoded middleware from express
// Parses request body in this form: key1=value1&key2=value2,
// and construct a json object
app.use(express.urlencoded({extended: true}));

//Course array
const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' }
];

/****************** BEGIN: get requests *************/
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses); //Send courses array
});

//API with param id
app.get('/api/courses/:id', (req, res) => {
    //Get course index
    const id = req.params.id;
    //const course = courses.find( (item) => {return item.id === parseInt(id)});
    const course = courses.find(function (item) {
        return item.id === parseInt(id) //Check for the condition. If true, match is found
    });

    console.log("Found course ", course);

    if(!course) {
        res.status(404); // Not found
        res.send(`Could find course with ID: ${id}`);
        return;
    }
    else
        res.send(course);
});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// POST API to create a new course
app.post('/api/courses', (req, res) => {

    console.log('Adding course', req.body);
 
    // Validate the course info
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name // The client will send name in http req body
    };

    courses.push(course); //Add the course to the courses array
    res.send(course); // Respond with the course object
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a course using put method
app.put('/api/courses/:id', (req, res) => {
    // Look up the course. If not found return 404
    const id = req.params.id;
    const course = courses.find(function (item) {
        return item.id === parseInt(id) //Check for the condition. If true, match is found
    });

    if (!course) {
        res.status(404); //Not found
        res.send(`Could find course with ID: ${id}`);
        return;
    }
    
    // Validate the course info
    const { error } = validateCourse(req.body);

    if (error) {
        //Bad request
        res.status(400).send(error); // Set statuscode and send error
        console.log(error);
        return;
    }

    // Update the course
    course.name = req.body.name;

    // Return the updated course
    res.send(course);

});

// Handler to delete a course using delete method
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course. If not found return 404
    const id = req.params.id;
    var course = {};

    for(var i = 0; i < courses.length; i++) {
        if(courses[i].id == id) {
            course = courses[i]; // The object to be deleted
            courses.splice(i, 1); // delete the element
            var found = 1;
            break;
        }
    }
    
    if (!found) {
        res.status(404); //Not found
        res.send(`Could find course with ID: ${id}`);
        return;
    }

    res.send(course);
});

// Validate function
function validateCourse(course) {
    // Define schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    // Validate
    const result = Joi.validate(course, schema);

    return result;
}

// Read PORT from env if set
const port = process.env.HTTP_PORT || 4000;
//listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});