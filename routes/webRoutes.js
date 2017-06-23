var express = require('express'),
    router = express.Router();

var employeeArry = [{
    firstname: 'Amit',
    salary: 10000,
    city: 'Delhi'
}]

router.get("/", (req, res) => {
    res.render('home.hbs', { title: 'Employee Details', data: employeeArry });
});


module.exports = router;