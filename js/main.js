var TTT = angular.module('henryTTT', []);

TTT.controller('TTTController', function($scope){

$scope.board = [{status:"Blank", pt:1}, {status:"Blank", pt:2},  {status:"Blank", pt:4},
				{status:"Blank", pt:8}, {status:"Blank", pt:16}, {status:"Blank", pt:32},
				{status:"Blank", pt:64},{status:"Blank", pt:128},{status:"Blank", pt:256}];


//$scope.makeMove = function(){
//					console.log(this.$index, this.eachCell.pt);
//				};

$scope.gameStatus="Game On!"
$scope.moveCounter = 0;
$scope.xPoint = 0;
$scope.oPoint = 0;

$scope.playerPicks = function(thisCell){
		
		console.log("Cell was: " + thisCell.status);

	while ((thisCell.status == "Blank") && ($scope.gameStatus=="Game On!")) {
		$scope.moveCounter = $scope.moveCounter + 1;
			if (($scope.moveCounter % 2) != 0){
				thisCell.status = "X";
				thisCell.image = "images/bigX.png";
				$scope.xPoint = $scope.xPoint + thisCell.pt ;
			} else if (($scope.moveCounter % 2) == 0){
				thisCell.status = "O";
				thisCell.image = "images/bigO.png";
				$scope.oPoint = $scope.oPoint + thisCell.pt ;
			} 

			switch($scope.xPoint){
				case 7 : thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 56 : thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 73 : thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 84 : thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 146: thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 273: thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 292: thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				case 448: thisCell.status = "X WINS!"; $scope.moveCounter == 9; $scope.xWin(); break;
				default: console.log("keep going");
			};
			switch($scope.oPoint){
				case 7  : thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 56 : thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 73 : thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 84 : thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 146: thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 273: thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 292: thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				case 448: thisCell.status = "O WINS!"; $scope.moveCounter == 9; $scope.oWin(); break;
				default: console.log("keep going");
			};

			if ($scope.moveCounter == 9) {
				// thisCell.status = "Game over!";
				// console.log("Game Over!");
				$scope.gameOver()
				break;
			}
	} // while loop
}; // function playerPicks

$scope.xWin = function(){
	$scope.gameXstatus="Player X WINS!";
	$scope.gameOver();
};

$scope.oWin = function(){
	$scope.gameOstatus="Player O WINS!";
	$scope.gameOver();
};

$scope.gameOver = function(){
	$scope.gameStatus="G A M E  O V E R  !";
};

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