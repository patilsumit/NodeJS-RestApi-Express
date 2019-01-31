/* Title: RestAPI for courses
 * Descriptions: Implements get and post methods
 * Refer final.js for complete implementation
 * Use postman/curl to test the APIs
 */
const express = require('express');
const app = express();
//Use json handler
app.use(express.json()); //middleware

//Course array
const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' }
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/****************** BEGIN: get requests *************/
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
// Eg: /api/courses/courseName post request will add a new course
app.post('/api/courses', (req, res) => {
    //Create a course object.
    console.log('Adding course', req.body);

    if (!req.body.name || req.body.name.length < 3) {
        res.status(400); // Bad request
        res.send("Error: name is required and minimum length is 3");
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
app.put('/api/courses/:id', (req,res) =>{
    const id = req.params.id;
    const course = courses.find(function (item) {
        return item.id === parseInt(id) //Check for the condition. If true, match is found
    });
    
    console.log("Found Course", course);

    if(!course) {
        res.status(404); // Not found
        res.send(`Could find course with ID: ${id}`);
        return;
    }
    else
    {
        course.name=req.body.name;
        res.send(course);
    }
        

    
});




//PORT
const port = process.env.HTTP_PORT || 4000;
//listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
