// Include the express module
const express = require('express');
const route = express.Router();
const Joi=require('joi');

//Course array
const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' }
];

route.get('/', (req, res) => {
    res.send(courses); //Send courses array
});

//API with param id
route.get('/:id', (req, res) => {
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
route.post('/', (req, res) => {

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
route.put('/:id', (req, res) => {
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
route.delete('/:id', (req, res) => {
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

module.exports = route;