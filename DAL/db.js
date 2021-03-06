var SQLDB = require('mssql');

const SQL_CONFIG = {
    user: 'adminbs',
    password: 'Bs#12345',
    server: '208.91.198.59',
    database: 'SampleDBs',
    pool: {
        max: 0,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

module.exports = {
    executeSQL: function(sql, callback) {
        var conn = new SQLDB.Connection(SQL_CONFIG);
        conn.connect().then(function() {
            var req = new SQLDB.Request(conn);
            req.query(sql).then((recordset) => {
                conn.close();
                callback(recordset);
            }).catch((err) => {
                console.log(err);
                callback(null, err);
            });
        })

    },
    executeProcSQL: function(empid, callback) {
        var conn = new SQLDB.Connection(SQL_CONFIG);
        conn.connect().then(function() {
            var req = new SQLDB.Request(conn);
            req.input("empid", SQLDB.BigInt, empid);
            req.execute("spGetListOfEmployees", function(err, recordset, retValue) {
                conn.close();
                callback(recordset[0]);
            });
        });

    },
    executeProcWithoutParamSQL: function(callback) {
        var conn = new SQLDB.Connection(SQL_CONFIG);
        conn.connect().then(function() {
            var req = new SQLDB.Request(conn);
            req.execute('spGetEmployeeTotals', function(err, recordset, retVal) {
                conn.close();
                callback(recordset[0]);
            })
        })
    },

    executeProcwithOneParam: function(emp, callback) {
        var conn = new SQLDB.Connection(SQL_CONFIG);
        conn.connect().then(function() {

            var req = new SQLDB.Request(conn);
            req.input('empname', SQLDB.VarChar(10), emp);
            req.execute('spGetEmployeeByName', function(err, recordset, retVal) {
                conn.close();
                callback(recordset[0]);
            })
        })
    },
    executeProcInsSQL: function(sqlproc, emp, callback) {
        var conn = new SQLDB.Connection(SQL_CONFIG);
        emp.dob = new Date(emp.dob);
        conn.connect().then(function() {

            var sqlTrans = new SQLDB.Transaction(conn);
            sqlTrans.begin(function(err) {
                var req = new SQLDB.Request(sqlTrans);
                req.input("firstname", SQLDB.VarChar(100), emp.firstname);
                req.input("city", SQLDB.VarChar(100), emp.city);
                req.input("gender", SQLDB.VarChar(10), emp.gender);
                req.input("departmentid", SQLDB.BigInt, emp.departmentid);
                req.input("salary", SQLDB.Decimal, emp.salary);
                req.input("dob", SQLDB.DateTime, emp.dob);

                req.execute("spCreateEmployee", function(err, recordset, retValue) {
                    if (!err) {
                        sqlTrans.rollback();
                        callback({ 'Saved': 'Success' });
                    } else {
                        sqlTrans.rollback();
                        callback(null, err);
                    }
                })
            })


        }).catch(function(err) {
            console.log(err);;
        });
    }
}