function newsController(){
	
	this.getAll = getAll;
	
	function getAll(req, res, next){
		var matches = [{
			'title': 'Partido de los Lunes', 
			'location': 'Gallo y Peron',
			'players' : [
      { user : {'name' : 'JPP', 'email' : 'jppampin@gmail.com' , 'isAdmin' : true }, 'confirm': false},
      { user : {'name' : 'JPP2', 'email' : 'jppampin@gmail.com', 'isAdmin ': false }, 'confirm': false},
      { user : {'name' : 'JPP3', 'email' : 'jppampin@gmail.com', 'isAdmin' : false }, 'confirm': true},
      { user : {'name' : 'JPP4', 'email' : 'jppampin@gmail.com', 'isAdmin' : false  }, 'confirm': true}
    ] }];

		res.json(matches);
		
	}
}

module.exports = new newsController();