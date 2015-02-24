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
var YifyMoviesBest2014 = { source: 'Yify Movies - Best 2014', url: 'http://yts.re/rss/2014/all/all/0', tags: ['torrent', 'pelicula']};
var YifyMovies2015 = { source: 'Yify Movies - 2015', url: 'http://yts.re/rss/2015/1080p/all/0', tags: ['torrent', 'pelicula']};
var TrailersAddict = { source: 'Trailers Peliculas', url: 'http://www.traileraddict.com/rss', tags: ['trailer', 'pelicula']};
var feeds = [TnFeed, InfobaeFeed,  ClarinFeed, RedUsersFeed, KickAssMovies,  LaNacionFeed, TrailersAddict];
var feed;
var urlParsed = [];
var waiting=0;

function xmlReaded(err, res){
	if(err) {
		waiting--;
		return complete();
	};

	//Busco la fuente por url y le asigno el documento.
	for(var i=0;i<feeds.length;i++){
		if(res.url == feeds[i].url){
			feeds[i].doc = res.doc;
		}
	}

	if(res.feed){
		atomParser.parse(res.doc, xmlParsed);
	} else {
		rssParser.parse(res.doc, xmlParsed);
	};

};

function xmlParsed(err, res){
	var source='';

	waiting--;

	if(err) {
		return complete();
	};
	
	//busco la fuente por documento
	for(var i=0; i<feeds.length;i++){
		if(feeds[i].doc == res.source){
			source = feeds[i].source;
		}
	}

	urlParsed.push({source: source, articles: res.articles});

	complete();
};

function getFeeds(){
	for(var i=0; i<feeds.length; i++){
		waiting++;
		xmlReader.load(feeds[i].url, xmlReaded);
	}
};

function complete(){
	if(!waiting){
		return cb(null, urlParsed);
	}
}

getFeeds();

};

module.exports = new NewsReader();