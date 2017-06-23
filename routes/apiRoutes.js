var express = require('express'),
    router = express.Router(),
    empFactory = require('../Factory/EmployeeFactory');
var bodyParser = require('body-parser');
var urlencoder = bodyParser.urlencoded({ extended: false });


router.get("/employees/:empid", (req, res) => {
    //empFactory.getEmployees(req, res);
    empFactory.getEmployeeById(req, res);
});
router.get("/employees", (req, res) => {
    empFactory.getEmployees(req, res);
});
router.post("/employees", urlencoder, (req, res) => {
    console.log('I');
    var emp = { "firstname": "Amit", "gender": "Male", "city": "Delhi", "departmentid": "1", "salary": 10000, 'dob': "1981-01-28T10:01:10.000Z" }
    empFactory.addEmployee(req, res, emp);
});
router.get('/getEmployeesTotal', (req, res) => {
    empFactory.getEmployeesTotal(req, res);
})
router.get('/employeeByName/:name', (req, res) => {
    empFactory.getEmployeeByName(req, res);
})


module.exports = router;