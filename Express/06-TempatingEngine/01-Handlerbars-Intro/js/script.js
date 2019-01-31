/* BEGIN - AJAX Request code */
var httpRequest = new XMLHttpRequest();
httpRequest.open('GET', '/data/pets-data.json'); // Pet data file
httpRequest.onreadystatechange = function() {
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    try {
    var data = JSON.parse(httpRequest.responseText);
    //console.log(data);
    createHTML(data); // Converts JSON data to HTML
    }
    catch (err) {
      console.log("Error: Unable to parse json data ", err);
    }
  }
};

httpRequest.onerror = function() {
  console.log("Connection error");
};

httpRequest.send();

/* END - AJAX Request code */

/* Function converts JSON data to HTML using Handlebars */
function createHTML(petsData) {
  // Get the raw handlerbar template from html using its id
  var rawTemplate = document.getElementById("petsTemplate").innerHTML;
  // Generate the compiled template
  var compiledTemplate = Handlebars.compile(rawTemplate);
  // Generate the html by passing the context(JSON object) to template func
  var generatedHTML = compiledTemplate(petsData);

  // Update the div placeholder with generated HTML
  var petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = generatedHTML;
}

/* calculateAge - Handlebars helper function */
Handlebars.registerHelper("calculateAge", function(birthYear) {
  var age = new Date().getFullYear() - birthYear;

  if (age > 0) {
    return age + " years old";
  } else {
    return "Less than a year old";
  }

});