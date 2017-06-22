var express = require('express');
var app = express();
var fs = require('fs');

console.log('\n'); // for readability purpose

// global vars



function readJsonFileSync(filepath) {
    return JSON.parse(fs.readFileSync(filepath));
}

function getFile(filename, path) {
    return readJsonFileSync(__dirname + path + filename);
}


var json = getFile('userInfo.json', '/');

app.locals.userInfo = (json);
app.locals.somename = "kolio";



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
});

