var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test123@ds155651.mlab.com:55651/todotestdb');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
//var item = Todo({ item: 'Get Milk Flowers' }).save(function(err) {
//    if (err) throw err;
//    console.log('Item Saved');
//})

var urlencoder = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

module.exports = function(app) {



    app.get('/todo', function(req, res) {

        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencoder, function(req, res) {

        var tdata = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        console.log(data[0].item.replace(/ /g, '-'));

        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        })

        console.log(data);

        res.render('todo', { todos: data });
    });

}