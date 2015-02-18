function AtomParser(){
}

AtomParser.prototype.parse = function parse(source, cb){
	var articles = null;
	var result = [];

	if( !source.feed || !source.feed.entry  ){
		var error = new Error('No se puede parseaar el canal');
		cb(error, null);
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

		result.push({
			title: title,
			description: description,
			link : url,
			image : image,
			pubDate: pubDate
		});
	}

	cb(null, result);
};

module.exports = new AtomParser();