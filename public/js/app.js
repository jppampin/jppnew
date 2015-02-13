var app = angular.module('StarterApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngSanitize']);

app.controller('AppCtrl', ['$http', '$scope', '$mdSidenav', '$filter',  function($http, $scope, $mdSidenav, $filter){
  var PAGESIZE = 5;
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

    var j=0;
    for(var i=0; i<data.length;i++){
      j++;
      if(j == 1){
        row.source1 = data[i].source;
        row.articles1 = $filter('limitTo')(data[i].articles, PAGESIZE);
        row.count1 = data[i].articles.length;
        row.showMore1 = (data[i].articles.length > PAGESIZE);
      }

      if(j == 2){
        row.source2 = data[i].source;
        row.articles2 = $filter('limitTo')(data[i].articles, PAGESIZE);
        row.count2 = data[i].articles.length;
        row.showMore2 = (data[i].articles.length > PAGESIZE);
      }

      if(j == 3){
        row.source3 = data[i].source;
        row.articles3 = $filter('limitTo')(data[i].articles, PAGESIZE);
        row.count3 = data[i].articles.length;
        row.showMore3 = (data[i].articles.length > PAGESIZE);
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

    $scope.feeds = data;

  });
  
  $scope.showMore = function showMore (row, columnIndex) {
      var source = row['source' + columnIndex];
      var feed;
      for(var i=0; i<= $scope.feeds.length;i++ ){
        if(source == $scope.feeds[i].source){
          feed = $scope.feeds[i];
          break;
        }
      }
      row['articles' + columnIndex] = $filter('limitTo')(feed.articles, row['articles' + columnIndex].length + PAGESIZE);
      row['showMore' + columnIndex] = (feed.articles.length > row['articles' + columnIndex].length);
  };

}]);