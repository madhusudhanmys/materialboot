myApp.config(['$routeProvider',function($routeProvider){

	$routeProvider
	
	.when('/add',
		{ 
			
	    templateUrl:'./pages/add.html'
	   })
		.when('/view',
		{ 
			
	    templateUrl:'./pages/view.html'
	   })


	
}]);