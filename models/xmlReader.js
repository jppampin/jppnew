var xml2js = require('xml2js');
var parseString = xml2js.parseString;

function XmlReader(){
};

XmlReader.prototype.load = function load(url, cb){
var urlParser = require('url');
var urlParsed = urlParser.parse(url);
var http = require('http');


http.get(url
	, function onCallback(res){
		var body = '';

		res.on('data', function onData(data){
			body += data;
		});

		res.on('end', function onEnd(err){
			if(err) {
				return cb(err, null)
			};

			parseString(body, function onParse(err, res){
				var result = {url: url , doc: res};
				return cb(err, result);
			});
		});
}).on('error', function onError(err) {
	return cb(err, null);
});
}

module.exports = new XmlReader();