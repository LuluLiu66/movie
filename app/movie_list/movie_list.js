(function(angular){

    var app = angular.module('moviecat.movie_list',[
      'ngRoute',
      'moviecat.http_jsonp'
      ]);

    // 配置路由
    app.config(['$routeProvider',function($routeProvider){
        //这里是可以传递多个参数的;
        $routeProvider.when('/:movietype/:page?',{
            controller:'movie_listController',
            templateUrl:'movie_list/view.html'
        });
    }]);

    // 创建控制器
    app.controller('movie_listController',[
      '$scope',
      '$http',
      '$routeParams',
      '$route',
      'MyHttp',function($scope,$http,$routeParams,$route,MyHttp){
        console.log($routeParams);
        // $route 提供一些方法可以动态的更新页面url中的参数
        //console.log($routeParams);
        ///console.log(MyHttp);
        // 通过$http来发发送ajax请求.
        // 发送get请求 $http.get，以/开头，表示从网站根目录开始.
        // $http.get('/moviecat/app/in_theaters.json').then(function(response){
        //   console.log(response);
        //     $scope.data=response.data;
        // });
        //callback="JSON_CALLBACK"
        //angular.callbacks._0
        
        // $http.jsonp('http://api.douban.com/v2/movie/in_theaters?start=1&count=3?callback=JSON_CALLBACK')
        //   .then(function(response){
        //     console.log(response);
        //   });
        //   // $http.jsonp('http://api.douban.com/v2/movie/in_theaters?start=1&count=3?callback=JSON_CALLBACK')
        //   .then(function(response){
        //     console.log(response);
        //   });
        var pageSize=5;/// 每页显示多少条数据
        $scope.page =($routeParams.page-0)||1;// 拿到想显示第几页数据。
        var start = ($scope.page-1)*pageSize;// 从第几条数据开始显示
        //console.log(start);
        $scope.allCount= 0; //总共多少条数据;
        $scope.loading=true;
 //       MyHttp.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movietype+'?q='+$routeParams.q,
 //        {start:start,count:pageSize},function(data){
          MyHttp.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movietype,
           {start:start,count:pageSize,q:$routeParams.q},function(data){
              // console.log(data);
              $scope.list=data.subjects;
              $scope.allCount=data.total;
              // 总共多少页
              $scope.allPage =Math.ceil($scope.allCount/pageSize);//     11 ,5   3

              $scope.loading=false;
              // angular无法监视异步操作中对数据模型的改;
              // 我们需要强制根据anulgar去检查数据模型是否发生了变化。
              $scope.$apply();


              //分页
              //每一页显示多少 ，第几页,第几条数据0，1，2，3，4
              // 5    , 1   ,  0                   5,6,7,8,9
              // 5    , 2   ， 5
              // 5    ，3   ， 10                  10,11,12,13,14
          });
          $scope.getPage=function(newPage){

              // 不允许请求小于第1页，或大于最大页。
              if(newPage<1||newPage>$scope.allPage){
                return;
              }
              //更新路由中的参数,需要传入一个object对，会把整个控制器再执行一遍.
              
              $route.updateParams({page:newPage});
          }
  }]);
})(angular);  //angular.callbacks._1