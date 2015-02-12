var xml2js = require('xml2js');
var parseString = xml2js.parseString;

function XmlReader(){
};

XmlReader.prototype.load = function load(url, cb){

var urlParser = require('url');
var urlParsed = urlParser.parse(url);

// var options = {
//   host: 'fwproxyl',
//   port: 8080,
//   path: url,
//   headers: {
//     Host: urlParsed.host
//   }
// };

var http = require('http');

http.get(url
	, function onCallback(res){
		var body = '';

		res.on('data', function onData(data){
			body += data;
		});

		res.on('end', function onEnd(err){
			if(err) CB(err, null);
			parseString(body, function onParse(err, res){
				cb(err, res);
			});
		});
}).on('error', function onError(err) {
	cb(err, null);
});
}

module.exports = new XmlReader();