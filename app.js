var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars');
var webRoutes = require("./routes/webRoutes");
var apiRoutes = require("./routes/apiRoutes");


var urlencoder = bodyParser.urlencoded({ extended: false });
var jsonencoder = bodyParser.json();
app.set('PORT', process.env.PORT);
app.use("/assets", express.static("node_modules/"));
app.set("view engine", 'hbs');
app.engine("hbs", exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin ,X-Requested-With, Content-Type,Accept');
    next();
})
app.use("/", webRoutes);
app.use("/api", apiRoutes);


app.listen((app.get('PORT')), function() {
    console.log('Server Started.....');
})