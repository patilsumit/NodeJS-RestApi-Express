/* Library for CRUD file ops */

// Dependencies
var fs = require('fs');
var path = require('path');

var data = {};

// Function to Create the user
// dir: Dir path for saving the file
// phone is the filename without .json extension
// data is the userObj to be saved
// callback is a callback function 
data.create = function (dir, phone, data, callback) {
    // construct the path
    var absPath = __dirname + "/" + "../data/" + dir + "/" + phone + ".json";

    // Create the file if it does not exist. Otherwise return error
    fs.open(absPath, "wx", function (err, fd) {
        if (!err) { // On Success
            // Proceed to save the data
            fs.write(fd, JSON.stringify(data), function (err) {
                if (err) {
                    callback(err);
                }
                else {
                  fs.close(fd, function(err) {
                    callback(err);
                  }); 
                }
            });
        }
        else { // On failure
            // File may already exist
            callback(err);
        }
    });
}

data.read = function (dir, phone, callback) {
    // construct the path
    var absPath = __dirname + "/" + "../data/" + dir + "/" + phone + ".json";

    // Read from file
    fs.readFile(absPath, function (err, data) {
        if (!err && data) { //Sucess
            // Parse the string into an Object
            try {
                var newObj = JSON.parse(data);
                // Return data by invoking callback
                callback(false, newObj);
            }
            catch (e) {
                callback(e);
            }
        }
        else { // Failure
            callback(err);
        }
    });
}

// Update the file with new data
data.update = function(dir,phone,data,callback){
    var absPath = __dirname + "/" + "../data/" + dir + "/" + phone + ".json";

    // Open the file for writing
    fs.open(absPath, 'r+', function(err, fd){
      if(!err && fd){
        // Convert data to string
        var stringData = JSON.stringify(data);
        // Truncate the file
        fs.ftruncate(fd,function(err){
          if(!err){
            // Write to file and close it
            fs.writeFile(fd, stringData,function(err){
              if(!err){
                fs.close(fd,function(err){
                  if(!err){
                    callback(false);
                  } else {
                    callback(err);
                  }
                });
              } else {
                callback(err);
              }
            });
          } else {
            callback(err);
          }
        });
      } else {
        callback(err);
      }
    });
  
  };

// Delete a file
data.delete = function(dir,phone,callback){
    var absPath = __dirname + "/" + "../data/" + dir + "/" + phone + ".json";
    console.log(absPath);

    // Unlink the file from the filesystem
    fs.unlink(absPath, function(err){
      callback(err);
    });
  
  };

// Return all files with json extension
data.listall = function(dir, callback) {

  
}
  
//Export the modules
module.exports = data;