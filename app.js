var express = require('express');
var todoCtrl = require('./controllers/todocontroller');




var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Fire Controllers.
todoCtrl(app);


app.listen(3000, function() {
    console.log('Server started @ 3000');
});