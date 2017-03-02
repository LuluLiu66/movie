(function (angular) {
    "use strict";

    // start your ride

    // 1.创建主模块
    var app = angular.module('moviecat',[
        'ngRoute',
        'moviecat.home_page',
        'moviecat.movie_detail',
        'moviecat.movie_list',
        'moviecat.auto_active'
        ]);

    // 配置路由：当用户输入的是其它的内容时，自动到home_page页面
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.otherwise({redirectTo:'/home_page'});
    }]);

    // 创建控制器
    app.controller('mainController',[
        '$scope',
        '$route',function($scope,$route){
        $scope.query = '';
        $scope.search=function(){
            $route.updateParams({movietype:'search'，q:$scope.query});
        }
    }]);
})(angular);
