var fs = require('fs');
fs.stat('data.txt', function(err, stats) {
    console.log(stats);
})