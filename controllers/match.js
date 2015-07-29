function MatchController(Match){
	
	this.getAll = getAll;
	
	function getAll(req, res, next){
		Match.find().populate('players.user', 'local.name local.email facebook.name facebook.email')
			.then(function(matches){
				res.json(matches);
			});
	}
}

module.exports = function init(Match){
	return new MatchController(Match);
};