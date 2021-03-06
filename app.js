// Use express
var express = require('express')

// For file i/o
, fs = require('fs')

// Instantiate our app/server
, app = module.exports = express.createServer();


// General server configuration
app.configure(function () {
	app.set('basedir', __dirname);
	app.set('views', __dirname + '/views');

	// Set '.hogan' as the default extension
	app.set('view engine', 'hogan');

	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// Use the 'hoganAdapter' for rendering '.hogan' files
	app.register('hogan', require('./lib/hoganAdapter.js'));
});


app.configure('development', function () {
	var logFile;

	console.log('** Development **');

	app.use(express.static(__dirname + '/public'));

	// express.favicon() needs to be called after setting the "static" folder
	app.use(express.favicon());

	logFile = fs.createWriteStream('/var/log/express/annualreport.log', {flags: 'a'});
	app.use(express.logger({stream: logFile}));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});


app.configure('production', function () {
	var logFile;

	console.log('** Production **');

	// Use minified static files
	app.use(express.static(__dirname + '/public_build'));

	// express.favicon() needs to be called after setting the "static" folder
	app.use(express.favicon());

	logFile = fs.createWriteStream('/var/log/express/annualreport.log', {flags: 'a'});
	app.use(express.logger({stream: logFile}));
    app.use(express.errorHandler());
});


// Instatiate the routes (must be done after express.favicon() to avoid routing conflicts)
require('./router')(app);


app.listen(80);
console.log('annualreport app started');