(function(angular){
    //
    //  1.创建首页模块 
    var app =angular.module('moviecat.home_page',[
        'ngRoute'
        ]);

    // 2.配置路由
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home_page',{
            controller:'home_pageController',
            templateUrl:'home_page/view.html'
        });
    }]);

    // 3.创建控制器
    app.controller('home_pageController',['$scope',function($scope){
        
    }]);
})(angular)