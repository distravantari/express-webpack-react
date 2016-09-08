// =======================
// Import Libraries
// =======================
var express = require("express");
var hbs = require("hbs");
var hbsutils = require("hbs-utils")(hbs);
var compress = require("compression");

var app = express();

global.__root = __dirname + "/"; // eslint-disable-line

process.on("uncaughtException", function (err) {
	console.log("Caught exception: " + err); // eslint-disable-line
});

// =======================
// Expressjs Configuration
// =======================
app.use(compress());
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/public", express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");
hbsutils.registerWatchedPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.disable("x-powered-by");

// =======================
// Routes
// =======================
require(__root + "node_scripts/routes/routes").routes(app);

// =======================
// Launch Application
// =======================
var PORT = 3010;
app.listen(PORT, function () {
	// job.start();
});
