function NewsReader(){
}

NewsReader.prototype.lookup = function(cb){
var xmlReader = require('./xmlReader');
var rssParser = require('./rssParser');
var TnFeed = { source: 'TN', url: 'http://tn.com.ar/rss.xml' };
var InfobaeFeed = {source: 'Infobae', url: 'http://cdn01.am.infobae.com/adjuntos/163/rss/ahora.xml' };
var LaNacionFeed = {source: 'La Nacion', url: 'http://contenidos.lanacion.com.ar/herramientas/rss/origen=2' };
var ClarinFeed = { source: 'Clarin', url: 'http://clarin.feedsportal.com/c/33088/f/577681/index.rss'} ;
var RedUsersFeed = {source: 'RedUsers', url: 'http://www.redusers.com/noticias/feed/' };
var SportEsFeed= { source: 'Sport ES', url: 'http://www.sport.es/es/rss/last_news/rss.xml' };
var KickAssMovies = { source: 'KickAss Movies', url: 'http://kickass.to/movies/?rss=1'};
var feeds = [TnFeed, InfobaeFeed,  ClarinFeed, RedUsersFeed, KickAssMovies];
var feed;
var urlParsed = [];

function xmlReaded(err, res){
	if(err) throw err;
	rssParser.parse(res, xmlParsed)
};

function xmlParsed(err, res){
	if(err) throw err;
	urlParsed.push({ source: feed.source, articles: res });
	if(feeds.length){
		feed = feeds.splice(-1)[0];
		getFeed(feed.url);
	} else {
		cb(null, urlParsed);
	}
};

function getFeed(url){
	xmlReader.load(url, xmlReaded);
};

feed = feeds.splice(-1)[0];
getFeed(feed.url);

};

module.exports = new NewsReader();