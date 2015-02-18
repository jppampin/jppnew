function NewsReader(){
}

NewsReader.prototype.lookup = function(cb){
var xmlReader = require('./xmlReader');
var rssParser = require('./rssParser');
var atomParser = require('./atomParser');
var TnFeed = { source: 'TN', url: 'http://tn.com.ar/rss.xml' , tags: ['noticia']};
var InfobaeFeed = {source: 'Infobae', url: 'http://cdn01.am.infobae.com/adjuntos/163/rss/ahora.xml', tags: ['noticia'] };
var LaNacionFeed = {source: 'La Nacion', url: 'http://contenidos.lanacion.com.ar/herramientas/rss/origen=2', tags: ['noticia'] };
var ClarinFeed = { source: 'Clarin', url: 'http://clarin.feedsportal.com/c/33088/f/577681/index.rss', tags: ['noticia']} ;
var RedUsersFeed = {source: 'RedUsers', url: 'http://www.redusers.com/noticias/feed/', tags: ['noticia', 'tecnologia'] };
var SportEsFeed= { source: 'Sport ES', url: 'http://www.sport.es/es/rss/last_news/rss.xml', tags: ['noticia', 'desportes'] };
var KickAssMovies = { source: 'KickAss Movies', url: 'http://kickass.to/movies/?rss=1', tags: ['torrent', 'pelicula']};
var YifyMoviesBest2014 = { source: 'Yify Movies - Best 2014', url: 'http://yts.re/rss/2014/1080p/all/7', tags: ['torrent', 'pelicula']};
var YifyMovies2015 = { source: 'Yify Movies - 2015', url: 'http://yts.re/rss/2015/all/all/0', tags: ['torrent', 'pelicula']};
var feeds = [TnFeed, InfobaeFeed,  ClarinFeed, RedUsersFeed, KickAssMovies, YifyMoviesBest2014, YifyMovies2015, LaNacionFeed];
var feed;
var urlParsed = [];

function xmlReaded(err, res){
	if(err) throw err;

	if(res.feed){
		atomParser.parse(res, xmlParsed);
	} else {
		rssParser.parse(res, xmlParsed);
	};
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