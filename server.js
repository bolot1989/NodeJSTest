var express = require('express');
var app = express();
var personalInfo = [
      'Bolot',
      'Kasybekov',
	  'Soprese pst. 3',
	  'bolot.89@gmail.com'	
   	];
var response = {};

var checkVersion = function(appVersion) {
	var versionRegExp = /^v{1}\d{1,2}$/.test(appVersion);
	return versionRegExp;
};

var failRepsonse = function(failMessage) {
	response = {
		success: false,
		message: failMessage
	}
	return response;
};



app.param('version', function(req, res, next, version) {
	req.appVersion = version;
	next();	
});

app.get('/api/:version/request', function (req, res) {
   	
    if(res.statusCode >= 400) {
		res.json(failRepsonse("Problem with Server"));
	}
	else if(checkVersion(req.appVersion) == false) {
		res.json(failRepsonse("Paramater doesn't pass validation"));
	}
	else {
		response = {
			success: true,
			data: personalInfo
		};
		res.json(response);
	}
	
	res.end();
});

app.get('/api/+request', function (req, res) {
	res.json(failRepsonse("Paramater doesn't pass validation"));
	res.end();
});
	



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});