(function(angular){

    // 1.创建模块
    
    var app = angular.module('moviecat.auto_active',[]);


    //2.创建自定义指令。
    
    app.directive('autoActive',['$location',function($location){
        return {
            // <div my-li  myclass="xx" aaa="ffff"> </div>
            // restrict:'ECMA'
            // template:'',
            // templateUrl:// 1.路径 2.script标签id type="text/ng-template"
            // replace:，为true时不能和注释合用；
            // scope:{myclass:'@' }；
            // link:function(scope,element,attributes){}
            link:function(scope,element,attributes){
                // scope 类似controller的$scope,作用范围不一样
                // elemnet: 自定义指令所在标签的对象（jqLite），
                // attributes: 获取自定义指令所在标签的属性；
                
                // 注册点击事件 
                //console.log(1111);
                // element.on('click',function(){
                //     console.log(222);
                //     angular.element(this).parent().children().removeClass('active');
                //     angular.element(this).addClass('active');
                // });
                $location.url();
                scope.loca=$location;
                scope.$watch('loca.url()',function(now,old){
                    var a= element.children();
                    var hash = a[0].hash.substr(1);
                    console.log(now);
                    if(now.startsWith(hash)){
                        element.parent().children().removeClass('active');
                        element.addClass('active');
                    }
                });
            }
        };
    }]);
    // 

})(angular);