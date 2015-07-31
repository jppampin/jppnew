var info = require('debug')('jppnew:matchController');

function MatchController(models){
	var Match = models.Match;
	var Player = models.Player;
	var User = models.User;

	this.getAll = getAll;
	this.addPlayer = addPlayer;
	this.confirmPlayer = confirmPlayer;
	
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
}

module.exports = function init(Match){
	return new MatchController(Match);
};