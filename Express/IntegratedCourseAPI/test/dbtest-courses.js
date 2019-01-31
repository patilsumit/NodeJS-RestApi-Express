/* Unit test code for courses model */

const { 
    createCourse, getAllCourses,
     getCourseById, updateCourse,deleteCourse
    } = require('../models/courses');

function testCreateCourse() {
    // Create a course document
    createCourse({
        name: "ReactJS",
        author: "Sumit Patil",
        price: 81,
        isPublished: true
    }).then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetAllCourses() {
    getAllCourses()
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetCourseById() {
    var id = '5c456ee668c29913a18c542a';

    getCourseById(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testUpdateCourse() {
    const course = {
        _id: '5c456ee668c29913a18c542a',
        name: 'Javascript Programming',
        author: 'Mubeen',
    };

    updateCourse(course)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

}
function testDeleteCourse(){
   
    var id="5c45767d83087719d6a0aa5c";

    deleteCourse(id)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
    
}
// testCreateCourse();
// testGetAllCourses();
// testGetCourseById();
// testUpdateCourse();
testDeleteCourse();
