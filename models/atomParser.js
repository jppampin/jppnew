function AtomParser(){
}

AtomParser.prototype.parse = function parse(source, cb){
	var articles = null;
	var result = { source: source, articles: []};

	if(!cb){
		return new Error('Debe ingresar un callback');
	}

	if(!source){
		return cb(new Error('Debe ingresar una url'));
	}

	if( !source.feed || !source.feed.entry  ){
		var error = new Error('No se puede parseaar el canal');
		return cb(error, null);
	}
	
	articles = source.feed.entry;

	for(var i=0;i < articles.length; i++){
		var article = articles[i];
		var title = article.title[0];
		var description = article.content[0].div[0]._;
		var url = article.link[0].$.href;
		var pubDate = article.updated[0];
		var image = null;

		if( article.content &&
			article.content[0] &&
			article.content[0].div &&
			article.content[0].div[0] &&
			article.content[0].div[0].img &&
			article.content[0].div[0].img[0] &&
			article.content[0].div[0].img[0].$ && 
			article.content[0].div[0].img[0].$.src ){
			image = article.content[0].div[0].img[0].$.src;
		}

		result.articles.push({
			title: title,
			description: description,
			link : url,
			image : image,
			pubDate: pubDate
		});
	}

	return cb(null, result);
};

module.exports = new AtomParser();