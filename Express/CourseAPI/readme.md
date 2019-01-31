#Course - RestAPI using Express

##Operations
- **Create a course** -> POST /api/courses

- **Retrieve a course** -> GET /api/courses/:id

- **Update a course** -> PUT /api/courses/:id

- **Delete a course** -> DELETE /api/courses/:id

##Description
- **Create a course** -> POST /api/courses  
**REQ:** {name: course-name}  
**RES:** {id: course-id, name: course-name}  

- **Retrieve a course** -> GET /api/courses/:id  
**REQ:** None  
**RES:** {id: course-id, name: course-name}  

- **Update a course** -> PUT /api/courses/:id  
**REQ:** {name: course-name}  
**RES:** {id: course-id, name: course-name}  

- **Delete a course** -> DELETE /api/courses/:id  
**REQ:** None  
**RES:** {id: course-id, name: course-name}  


# Steps to Test
**Files**  
1. basic.js - Implements only GET and POST APIs.  
2. final.js - Implements GET, POST, PUT and DELETE methods. Uses joi for data validation.  

**Install externals modules (Only once)**

	npm install

**Run**

	node basic.js
	or
	node final.js

**Test the Course APIs**

Use postman application to test the Rest APIs.  

**Example:**

-  Get all courses: GET http://localhost:5000/api/courses  
-  Get course with ID 1: GET http://localhost:5000/api/courses/1  

-  Create a course: POST http://localhost:5000/api/courses
	- Select body tab
	- Chose raw -> JSON(application/json)
	- Specify course details in json format
	```	
		{
		    "name": "Javascript"
		}
	```


#Notes

These are different Form content types defined by W3C. If you want to send simple text/ ASCII data, then x-www-form-urlencoded will work. This is the default.

But if you have to send non-ASCII text or large binary data, the form-data is for that.

You can use Raw if you want to send plain text or JSON or any other kind of string. Like the name suggests, Postman sends your raw string data as it is without modifications. The type of data that you are sending can be set by using the content-type header from the drop down.

Binary can be used when you want to attach non-textual data to the request, e.g. a video/audio file, images, or any other binary data file.

Refer to this link for further reading: [Forms in HTML documents](https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1) 