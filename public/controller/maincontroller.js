var myApp = angular.module('innovation', ['ngRoute']);

myApp.controller('leftmenu',function($scope,$http,$location,$rootScope){

            $scope.add = function(path){
                $location.path(path);
                   }; 
            $scope.view= function(path){
                $location.path(path);
                   }; 


         });
myApp.controller('page',function($scope,$http,$location,$rootScope){

         $scope.add=function(){
         	console.log($scope.info);
         	$http.post('/adddata',$scope.info).then(function(response){
 			    console.log(response);
          refresh();
	     	});
        	};
          

       
     		var refresh=function(){
           $http.get('/getdata').then(function(response){
          	console.log("data fetched");
          	$scope.dis = response.data;
			})};refresh();

     $scope.remove = function(id)
     {       
          console.log(id);
          $http.delete('/removedata/' + id ).then(function(response){
            refresh();
      });
     };   

        $scope.edit = function(id) {
        console.log(id);
        $http.get('/editdata/' + id).then(function(response){
        $scope.info = response.data;
        angular.forEach( $scope.info,function(key,val)
        {
        $scope.info=[];
        console.log(key);
        $scope.info= key;
        })
      
        });
        };

        $scope.deselect = function()
     {
      $scope.info="";
     }
          $scope.update = function()
     {
      console.log($scope.info.id); 
      $http.put('/updatedata/' + $scope.info.id,$scope.info).then(function(response){
        refresh();
      }); 

           
     };

});
			
	     