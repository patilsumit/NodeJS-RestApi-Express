var url = require('url');

// Middleware function to log incoming requests
function logger(req, res, next) {
    // Get the HTTP method
    var method = req.method.toLowerCase();

    // Parse the url
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;

    console.log("REQ %s %s", method, path); // Log the request
    next(); // Pass control to next middleware
}

module.exports = logger;