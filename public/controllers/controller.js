var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
console.log("Hola he iniciado bien");

var refresh = function() {
$http.get('/barco').success(function(response){
	console.log("He recibido la informacion");
	$scope.barco = response;
	$scope.barc = "";
});
};

refresh();

$scope.addBarc = function(){
	console.log($scope.barc);
	$http.post('/barco', $scope.barc).success(function(response){
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id){
	console.log(id);
	$http.delete('/barco/' + id).success(function(response){
		refresh();
	});
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/barco/' + id).success(function(response){
		$scope.barc = response;
	});
};

$scope.update = function(){
	console.log($scope.barc._id);
	$http.put('/barco/' + $scope.barc._id, $scope.barc).success(function(response){
		refresh();
	})
};

$scope.deselect = function(){
	$scope.barc = "";
}

})
