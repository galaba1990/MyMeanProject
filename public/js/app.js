var myApp = angular.module('myPet',['ngRoute','ngAnimate','ngMaterial']);

myApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'templates/homePage.html',
                    controller: 'homePageCtrl'
                }).
                    when('/login', {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginPageCtrl'
                }).
                when('/resgistration', {
                    templateUrl: 'templates/resgistration.html',
                    controller: 'resgistartionCtrl'
                }).
                when('/dashboard', {
                    templateUrl: 'templates/Dashboard.html',
                    controller: 'dashBoardCtrl'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]);

myApp.controller('LoginPageCtrl', ['$scope','$http','$rootScope','$location',function($scope,$http, $rootScope,$location) {
        
        $scope.login = function (userDataIs){
                                             try{
            $http.post('/login',userDataIs).success(function (response){
            console.log("response:" + JSON.stringify(response));
            alert("i am login");
                        //$rootScope.nickName = response.data[0].nickname;
            // $rootScope.admin = response.data[0].admin;
             $location.url('/dashboard');
        });
    }catch(eror){
        console.log(eror);
        
    }
        };

//$scope.submit = function (){
//                auth.signin({}, function (profile, token) {
//                    console.log("profile is:" + JSON.stringify(profile));
//      // Success callback
//      store.set('profile', profile);
//      store.set('token', token);
//      $location.path('/dashboard');
//    }, function () {
//      // Error callback
//    });
//};
this.userState = '';
        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS '+'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI '+'WY').split(' ').map(function (state) { return { abbrev: state }; });

//  var vm = this;
//
//  vm.toggleSidenav = function(menuId) {
//    $mdSidenav(menuId).toggle();
//  };


       
  
}]);

myApp.controller('resgistartionCtrl', ['$scope','$location','$http','$rootScope', function($scope,$location,$http,$rootScope) {
    $scope.submit = function(userData){
        $http.post('/topTopic',userData).success(function (response){
            console.log("response:" + JSON.stringify(response));
             $location.url('/dashboard');
        });
    };
}]);

myApp.controller('dashBoardCtrl', ['$scope','$rootScope', function($scope,$rootScope) {
   $scope.postTheTopic = function(){
      alert("post the topic....");
  };
}]);

myApp.controller('homePageCtrl', ['$scope','$rootScope', function($scope,$rootScope) {
  
}]);

myApp.controller('commonCtrl', ['$scope','$rootScope','$mdDialog','$location', function($scope,$rootScope,$mdDialog,$location) {
  
   $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/tabDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
  $scope.login = function (){
      $location.path('/login');
  };

  $scope.sginUp = function (){
        $location.path('/resgistration');
  };
}]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  
  $scope.login = function(){
      alert("login is calling...");
  };
};
  