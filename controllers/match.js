var info = require('debug')('jppnew:matchController');

function MatchController(models){
	var Match = models.Match;
	var Player = models.Player;
	var User = models.User;

	this.getAll = getAll;
	this.getLast = getLast;
	this.addPlayer = addPlayer;
	this.confirmPlayer = confirmPlayer;
	this.addMatch = addMatch;
	
	function getAll(req, res, next){
		return Match.find().populate('players.user', 'local.name local.email facebook.name facebook.email')
			.populate('players', 'confirmed')
			.then(function(matches){
				res.json(matches);
				return matches;
			}, function error (err) {
				return err;
			});
	}

	function getLast(req, res, next){
		return Match.findOne({}, {}, { sort : { when : -1 } } )
						.select('_id title players')
						.populate('players.user', 'local.name local.email facebook.name facebook.email')
						.then(function  (match) {
							res.json(match);
							return match;
						}, function error (err) {
							return error;
						});
	}

	function addPlayer(req, res, next){
		var matchId = req.params.matchId;
		var player = req.body;
		// look for user
		User.findOne({ 'local.email': player.user.local.email })
			.then(function(user){ 
				Match.findOne({ '_id' : matchId})
					.then(function(match){
						var existingPlayer = null;
						for(var i=0; i<match.length; i++){
							var player = match.players[i];
							if(user.local.email === player.user.local.email){
								existingPlayer = player;
								break;								
							}
						}

						if(existingPlayer)
							return;

						var newPlayer = new Player();
						newPlayer.user = user;

						match.players.push(newPlayer);
						match.save().then(function(){
							return res.send(200);
						});
					});	
			});
			
	}

	function confirmPlayer(req, res, next){
		var matchId = req.params.matchId;
		var player = req.body;

		return Match.findOne({ '_id' : matchId })
			.populate('players.user', 'local.name local.email facebook.name facebook.email')
			.populate('players', 'confirmed')
			.then(function (match) {
				var playerConfirmerd = null;

				for(var i=0; i< match.players.length; i++){
					var playerToCheck = match.players[i];
					if(playerToCheck.user.local.email === player.user.local.email){
						playerConfirmerd = playerToCheck;
						break;
					}
				}

				playerConfirmerd.confirmed = player.confirmed;
				match.save().then(function () {
					res.end();
				});

				return match;
		})
	}

	function addMatch(req, res, next) {
		var match = req.body;
		info(match);
		var newMatch = new Match();
		newMatch.title = match.title;
		return newMatch.save().then(function  (match) {
			res.send(200);
		}, function error (err) {
			res.send("Error al crear el partido!");
		});
	}

}

module.exports = function init(Match){
	return new MatchController(Match);
};