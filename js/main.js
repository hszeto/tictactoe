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
$scope.xPoint = 0;
$scope.oPoint = 0;

$scope.playerPicks = function(thisCell){
		
		console.log("Cell was: " + thisCell.status);

	while (thisCell.status == "Blank"){
		$scope.moveCounter = $scope.moveCounter + 1;
			if (($scope.moveCounter % 2) != 0){
				thisCell.status = "X";
				$scope.xPoint = $scope.xPoint + thisCell.pt ;
			} else if (($scope.moveCounter % 2) == 0){
				thisCell.status = "O";
				$scope.oPoint = $scope.oPoint + thisCell.pt ;
			} 

			switch($scope.xPoint){
				case 7 : thisCell.status = "X WINS!"; break;
				case 56 : thisCell.status = "X WINS!"; break;
				case 73 : thisCell.status = "X WINS!"; break;
				case 84 : thisCell.status = "X WINS!"; break;
				case 146: thisCell.status = "X WINS!"; break;
				case 273: thisCell.status = "X WINS!"; break;
				case 296: thisCell.status = "X WINS!"; break;
				case 448: thisCell.status = "X WINS!"; break;
				default: console.log("keep going");
			};
			switch($scope.oPoint){
				case 7  : thisCell.status = "O WINS!"; break;
				case 56 : thisCell.status = "O WINS!"; break;
				case 73 : thisCell.status = "O WINS!"; break;
				case 84 : thisCell.status = "O WINS!"; break;
				case 146: thisCell.status = "O WINS!"; break;
				case 273: thisCell.status = "O WINS!"; break;
				case 296: thisCell.status = "O WINS!"; break;
				case 448: thisCell.status = "O WINS!"; break;
				default: console.log("keep going");
			};

			if ($scope.moveCounter == 9) {
				thisCell.status = "Game over.";
			}

	} // while loop

}; // function playerPicks



//$scope.playerPicks = function(thisCell){
//	$scope.moveCounter = $scope.moveCounter + 1;
//	console.log("Cell was: " + thisCell.status);
//	if ((thisCell.status == "Blank") && ($scope.moveCounter %2) == 0){
//		thisCell.status = "X";
//	} else if ((thisCell.status == "Blank") && ($scope.moveCounter %2) == 1){
//		thisCell.status = "O";
//	}
//	console.log("Cell is now: " + thisCell.status);
//};

}); // end of TTTController