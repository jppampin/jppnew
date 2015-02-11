function RssParser(){
}

RssParser.prototype.parse = function parse(feed, cb){
	var articles = null;
	var result = [];

	if( !feed.rss || !feed.rss.channel || !feed.rss.channel[0].item ){
		var error = new Error('No se puede parseaar el canal');
		cb(error, null);
	}
	
	articles = feed.rss.channel[0].item;

	for(var i=0;i < articles.length; i++){
		var article = articles[i];
		var title = article.title[0];
		var description = article.description[0];
		var url = article.link[0];
		var image = null;
		var pubDate = article.pubDate[0];

		if( article["media:content"] && 
			article["media:content"][0] &&
			article["media:content"][0].$ && 
			article["media:content"][0].$.url ){
			image = article["media:content"][0].$.url;
		}

		if( article.enclosure &&
			article.enclosure[0] &&
			article.enclosure[0].$ &&
			article.enclosure[0].$.url ){
			image = article.enclosure[0].$.url;
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

module.exports = new RssParser();