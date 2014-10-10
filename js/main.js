var TTT = angular.module('henryTTT', []);

TTT.controller('TTTController', function($scope){

$scope.board = [
				{status:"Blank", pt:1},{status:"Blank", pt:2},{status:"Blank", pt:4},
				{status:"Blank", pt:8},{status:"Blank", pt:16},{status:"Blank", pt:32},
				{status:"Blank", pt:64},{status:"Blank", pt:128},{status:"Blank", pt:256}];


//$scope.makeMove = function(){
//					console.log(this.$index, this.eachCell.pt);
//				};

$scope.moveCounter = 0;

$scope.playerPicks = function(thisCell){
	$scope.moveCounter = $scope.moveCounter + 1;
	console.log("Cell was: " + thisCell.status);
	if (($scope.moveCounter %2) == 1){
		thisCell.status = "X";
	} else {
		thisCell.status = "O";
	}
	console.log("Cell is now: " + thisCell.status);
};


}); // end of TTTController