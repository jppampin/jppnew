var app = angular.module('StarterApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngSanitize', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'grid.html',
        controller: 'AppCtrl'
      })
      .when('/login', {
        templateUrl: 'login.html'
      })
      .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'signupController'
      })
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

app.controller('signupController', ['$http', '$scope', '$mdToast', function($http, $scope, $mdToast){
  $scope.signUp = function signUp(){
    var newUser = {
      name : $scope.name,
      email : $scope.email,
      password : $scope.password,
      confirmPassword : $scope.confirmPassword
    };
    
    $http({
    method: 'POST',
    url: '/signup',
    data: $.param(newUser),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function success(data, status, headers, config) {
      $mdToast.show(
        $mdToast.simple()
          .content('Registered!')
          .hideDelay(3000)
      );
    })
    .error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data);
  });
  };

  
}]);

app.controller('SidebarCtrl',['$mdSidenav','$scope' ,function($mdSidenav,$scope){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

}]);

app.controller('AppCtrl', ['$http', '$scope', '$mdSidenav', '$filter',  function($http, $scope, $mdSidenav, $filter){
  var PAGESIZE = 5;
  
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

    _.chain(data)
      .shuffle()
      .each(function(feed){
      j++;
      if(j == 1){
        row.source1 = feed.source;
        row.articles1 = $filter('limitTo')(feed.articles, PAGESIZE);
        row.count1 = feed.articles.length;
        row.showMore1 = (feed.articles.length > PAGESIZE);
      }

      if(j == 2){
        row.source2 = feed.source;
        row.articles2 = $filter('limitTo')(feed.articles, PAGESIZE);
        row.count2 = feed.articles.length;
        row.showMore2 = (feed.articles.length > PAGESIZE);
      }

      if(j == 3){
        row.source3 = feed.source;
        row.articles3 = $filter('limitTo')(feed.articles, PAGESIZE);
        row.count3 = feed.articles.length;
        row.showMore3 = (feed.articles.length > PAGESIZE);
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
    })
    .value();

    if(j>0){
      rows.push(row);
    }

    $scope.rows = rows;

    $scope.feeds = data;

  });
  
  $scope.showMore = function showMore (row, columnIndex) {
      var source = row['source' + columnIndex];
      var feed = _
         .chain($scope.feeds)
         .filter(function(feed){ return feed.source == source })
         .first()
         .value();
      var numOfArticlesToDisplay = row['articles' + columnIndex].length + PAGESIZE;
      
      row['articles' + columnIndex] = _.take(feed.articles, numOfArticlesToDisplay);
      //$filter('limitTo')(feed.articles, row['articles' + columnIndex].length + PAGESIZE);
      row['showMore' + columnIndex] = (feed.articles.length > row['articles' + columnIndex].length);
  };
}]);
