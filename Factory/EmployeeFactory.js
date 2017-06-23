const DAL = require('../DAL/db');
const UTILS = require('../Utils/utils');

module.exports = {
    getEmployees: (req, res) => {
        DAL.executeSQL("SELECT * FROM EMPLOYEES", function(result, err) {
            if (err)
                UTILS.get501Response(req, res, result, err);
            else
                UTILS.get200Response(req, res, result, err);
        })
    },
    getEmployeeById: (req, res) => {

        DAL.executeProcSQL(req.params.empid, function(result, err) {
            if (err)
                UTILS.get501Response(req, res, result, err);
            else
                UTILS.get200Response(req, res, result, err);

        })
    },
    addEmployee: (req, res, emp) => {
        DAL.executeProcInsSQL("spCreateEmployee1", emp, function(result, err) {
            if (err) {
                UTILS.get501Response(req, res, result, err);
            } else
                UTILS.get200Response(req, res, result, err);

        })
    },
    getEmployeesTotal: (req, res) => {
        DAL.executeProcWithoutParamSQL(function(result, err) {
            if (err)
                UTILS.get501Response(req, res, result, err);
            else
                UTILS.get200Response(req, res, result, null);

        })
    },
    getEmployeeByName: (req, res) => {
        DAL.executeProcwithOneParam(req.params.name, function(result, err) {
            if (err)
                UTILS.get501Response(req, res, result, err);
            else
                UTILS.get200Response(req, res, result, null);
        })
    }
}