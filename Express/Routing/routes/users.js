/*
 * Title: RestAPI for Users
 * Description: Implements CRUD APIs for User
 */

// Include required modules
const express = require('express');
const route = express.Router();
const Joi=require('joi');

var fops = require('../lib/data'); // Lib to save data

// Validate function
function validateUser(user) {
    // Define schema
    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        phone: Joi.string().regex(/^[0-9]{10}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        tosAgreement: Joi.bool().required()
    };

    return (Joi.validate(user, schema)); // Returns result of validation
}

// Validate for PUT
function validateUserForUpdate(user) {
    // Define schema
    const schema = {
        firstName: Joi.string().min(3),
        lastName:  Joi.string().min(3),
        phone: Joi.string().regex(/^[0-9]{10}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    };              

    return (Joi.validate(user, schema)); // Returns result of validation
}

// Create/POST API for Users
route.post('/', function(req, res){
    // Validate the user object (req.body)
    const { error } = validateUser(req.body);

    // If invalid return error
    if (error) {
        res.status(400).send(error.details);
        console.log(error.details);
        return;
    }

    var user = req.body;

    if(user.tosAgreement == false) {
        console.log("ERROR: tosAgreement must be true");
        res.status(400).send("ERROR: tosAgreement must be true");
        return;
    }

    // Save the user object to file
    fops.create('users', user.phone, user, function (err) {
        if (err) {
            console.log("ERROR: Could not create user", err);
            res.status(400).send("ERROR: Could not create user\n" + err.message);
        }
        else {
            console.log("SUCESS: Saved user to file");
            res.send(user);
        }
    });
});

// List API for listing all Users (Later)

// Read/GET API for User with param as phone
route.get('/:phone', function(req, res){
    var phone = req.params.phone;

    // Get user details from file
    var newObj = {};
    fops.read('users', phone, function (err, newObj) {
        if (!err && newObj) { // Read is successful
            res.send(newObj);
            console.log("Read User: ", newObj);
        }
        else { // Error in reading
            res.status(404).send("ERROR: User not found");
            console.log("ERROR: Could not read user", err);
        }
    });
});

// Update/PUT API to update User with param as phone
route.put('/', function(req, res){
    // Validate the user details
    const { error } = validateUserForUpdate(req.body);

    // If invalid return error
    if (error) {
        res.status(400).send(error.details);
        console.log(error.details);
        return;
    }

    // Read current user, then update
    var user = req.body;
    const {firstName, lastName, password,phone} = user;

    if(firstName || lastName || password) {
        // Update the user
        fops.update('users', phone, origUser, function (err) {
            if(err) {
                console.log("Error In updating", err);
            }
            else {
                console.log("Sucess: Updated user to file");
            }
        });
       
    }
    else {
        console.log("ERROR: Cannot update user");
        res.status(400).send("ERROR: Cannot update user. Required fields are missing");
        return;
    }

});

// DELETE API to delete User with param as phone
route.delete('/:id',(req,res) =>{
    const id = req.params.id;
    var users = {};
    var found=0;
     fops.delete('users',id,function(err)
     {
         if(err)
         {
             console.log("Error in delete",err);
         }
         else
         {
             console.log(" Sucess deleted");
             found=1;
         }
     });

    if (!found) {
        res.status(404); //Not found
        res.send(`Could find course with ID: ${id}`);
        return;
    }

    res.send(user);

})

module.exports = route;