//Import Express
const express = require('express');
const app = express(); //Returns an object

// API - http://localhost:3000/, method GET 
app.get('/', (req, res) => {
    console.log("GET Request for URL /");
    res.send('Hello World!');
    res.end();
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
    res.end();
});

//API with param id
// http://localhost:3000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

//API with params year and month
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
    // res.send(req.query); //Query string Eg: /api/courses/year/month/?sortBy=name
});

//PORT
const port = process.env.HTTP_PORT || 3000;
//listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}` );
});
