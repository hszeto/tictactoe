var TTT = angular.module('henryTTT', []);

TTT.controller('TTTController', function($scope){

$scope.board = [{status:"Blank", pt:1}, {status:"Blank", pt:2},  {status:"Blank", pt:4},
				{status:"Blank", pt:8}, {status:"Blank", pt:16}, {status:"Blank", pt:32},
				{status:"Blank", pt:64},{status:"Blank", pt:128},{status:"Blank", pt:256}];


// init variables
$scope.gameStatus="Game On!"
$scope.moveCounter = 0;
$scope.xPoint = 0;
$scope.oPoint = 0;

$scope.playerPicks = function(thisCell){										// function playerPicks starts 
	while ((thisCell.status == "Blank") && ($scope.gameStatus=="Game On!")) {	// check for blank cells and game status is on.
		$scope.moveCounter = $scope.moveCounter + 1;							// increase move counter

			if (($scope.moveCounter % 2) != 0){									// if move counter is odd, then it's X's move.
				thisCell.status = "X";				
				thisCell.image = "images/bigX.png";
				$scope.xPoint = $scope.xPoint + thisCell.pt ;					// increase X points.
			} else if (($scope.moveCounter % 2) == 0){							// if move counter is even, then it's O's move.
				thisCell.status = "O";
				thisCell.image = "images/bigO.png";
				$scope.oPoint = $scope.oPoint + thisCell.pt ;					// increase O points.
			} 

			var winPoint = [7,56,73,84,146,273,292,448];						// 8 possible winning points in array.

			for (var i=0; i<8; i++) {
				switch(winPoint[i] & $scope.xPoint){							// Win logic. Case match X points.
					case 7 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 56 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 73 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 84 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 146 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 273 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 292 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					case 448 : thisCell.status = "X WINS!"; $scope.xWin(); break;
					default: console.log("keep going");
				};
			
				switch(winPoint[i] & $scope.oPoint){							// Win logic. Case match O points.
					case 7  : thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 56 : thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 73 : thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 84 : thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 146: thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 273: thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 292: thisCell.status = "O WINS!"; $scope.oWin(); break;
					case 448: thisCell.status = "O WINS!"; $scope.oWin(); break;
					default: console.log("keep going");
				};
			};

			 if ($scope.moveCounter == 9) {										// fire gameover function when max move is reached.
				$scope.gameOver();
				break;
			}

	} // while loop ends
}; // function playerPicks ends

$scope.xWin = function(){														// X win function
	$scope.gameXstatus="Player X WINS!";
	$scope.gameOver();
};

$scope.oWin = function(){														// O win function
	$scope.gameOstatus="Player O WINS!";
	$scope.gameOver();
};

$scope.gameOver = function(){													// Game Over function
	$scope.gameStatus="G A M E  O V E R  !";
};


}); // end of TTTController