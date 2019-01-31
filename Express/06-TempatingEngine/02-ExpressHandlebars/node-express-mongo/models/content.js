var mongoose = require('mongoose');


// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/play',{ useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));


var Schema = mongoose.Schema;
var schema = new Schema({ 
 title: {type: String, required: true}, 
 description: {type: String, required: true}, 
 author: {type: String, required: true} ,
}); 

var allContent = mongoose.model('Content', schema);

async function createContent(contentsObj){
    const course = new allContent(contentsObj);
    
    // Save the document
    try {
        // Use validate method to validate a document
        // let result = course.validate();
        result = await course.save();
        console.log(result);
        return result;
    }
    catch(err) {
        console.log("Error: Could not save document", err.message)
    }
}
exports.allContent = allContent;
module.exports.createContent = createContent;