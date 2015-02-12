var app = angular.module('StarterApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngSanitize']);

app.controller('AppCtrl', ['$http', '$scope', '$mdSidenav', function($http, $scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $http.get('/news').success(function(data) {
    var rows = [];

    var row = {
      source1: '',
      source2: '',
      source3: '',
      articles1: [],
      articles2: [],
      articles3: []
    };

    var parser= new DOMParser();

    var j=0;
    for(var i=0; i<data.length;i++){
      j++;
      if(j == 1){
        row.source1 = data[i].source;
        row.articles1 = data[i].articles;
        row.count1 = data[i].articles.length;
      }

      if(j == 2){
        row.source2 = data[i].source;
        row.articles2 = data[i].articles;
        row.count2 = data[i].articles.length;
      }

      if(j == 3){
        row.source3 = data[i].source;
        row.articles3 = data[i].articles;
        row.count3 = data[i].articles.length;
        rows.push(row);
        row = {
          source1: '',
          source2: '',
          source3: '',
          articles1: [],
          articles2: [],
          articles3: []
        };  
        j = 0;
      }
    };

    if(j>0){
      rows.push(row);
    }
    $scope.rows = rows;
  });

}]);