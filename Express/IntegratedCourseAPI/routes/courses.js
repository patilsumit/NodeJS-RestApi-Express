// Include the required modules
const { createCourse, getAllCourses, getCourseById ,deleteCourse ,updateCourse} = require('../models/courses');
const express = require('express');
const Joi = require('joi'); // JSON validation

const route = express.Router();

// " /api/course - URL"
// Route handler for get all courses
route.get('/', (req, res) => {
    // Get all courses
    getAllCourses()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to get course\n" + err.message);
            console.log("Error: Unable to get course\n", err);
        })
});

//API with param id
route.get('/:id', (req, res) => {
    const id = req.params.id;
    // Get the course object using id
    getCourseById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.status(404);
        res.send("Error: Unable to get course\n" + err.message);
        console.log("Error: Unable to get course\n", err);
    })
});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// http://localhost/api/course - POST - {JSON course}
// POST API to create a new course
route.post('/', (req, res) => {
    // Validate the course info
    const { error } = validateCourse(req.body); //Joi
    
    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add course to db
    createCourse(req.body) // JSON course object
        .then((result) => {
            res.send(result); //  Send the result (new course object) back to user
            console.log("Created a new course: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create course\n" + err.message);
            console.log("Error: Unable to create course\n", err);
        });
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a course using put method
route.put('/:id', (req, res) => {
    // Look up the course. If not found return 404
   const id=req.params.id;

   updateCourse(req.body,id)
   .then((result) => {
    res.send(result);
})
.catch((err) => {
    res.status(404);
    res.send("Error: Unable to get course\n" + err.message);
    console.log("Error: Unable to get course\n", err);
})

});

// Handler to delete a course using delete method
route.delete('/:id', (req, res) => {
    // Look up the course. If not found return 404
    const id = req.params.id;
    // Get the course object using id
    deleteCourse(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.status(404);
        res.send("Error: Unable to get course\n" + err.message);
        console.log("Error: Unable to get course\n", err);
    })
});

// Validate function
function validateCourse(course) {
    // Define schema
    const schema = {
        name: Joi.string().min(4).max(60).required(),
        author: Joi.string().min(4).max(60).required(),
        tags: Joi.array().items(Joi.string()), // String Array
        date: Joi.date(),
        price: Joi.number(),
        isPublished: Joi.boolean()
    };

    // Validate
    const result = Joi.validate(course, schema);

    return result;
}

module.exports = route;