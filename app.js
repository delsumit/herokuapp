var express = require('express');
var todoCtrl = require('./controllers/todocontroller');




var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Fire Controllers.
todoCtrl(app);


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});