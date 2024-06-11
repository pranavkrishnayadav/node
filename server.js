// Import modules express, body-parser, cors
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

// Create rest object
let app = express();

// Set JSON as MIME type
app.use(bodyParser.json());

// Client is not sending form data -> encoding JSON
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS -> Cross-Origin Resource Sharing -> communication among various ports
app.use(cors());

// Create port
let port = process.env.PORT || 8080;

// Import fetch, insert, update, delete modules
let fetch = require("./fetch/fetch");
let insert = require("./insert/insert");
let update = require("./Update/update");
let remov = require("./delete/delete");

// Use above modules
app.use("/fetch", fetch);
app.use("/insert", insert);
app.use("/update", update);
app.use("/delete", remov);

// Assign port number
app.listen(port, () => {
  console.log("Server listening on port:", port);
});

/*
    >node server
    Test following URLs with Postman
    http://localhost:8080/fetch     (GET)
    http://localhost:8080/insert    (POST)
    http://localhost:8080/update    (PUT)
    http://localhost:8080/delete    (DELETE)
    Body -> raw -> JSON
*/
