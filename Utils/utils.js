module.exports = {

    get501Response: function(req, res, rec, err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ 'Error22': err }));
        res.end();
    },
    get200Response: function(req, res, rec, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(rec));
        res.end();
    },


}