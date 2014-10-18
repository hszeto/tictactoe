var TTT = angular.module('TTT', ["firebase"]);

TTT.controller('TTTController', function($scope, $firebase){

$scope.remoteGameContainer = 				// define the location to Firebase
  $firebase(new Firebase("https://ttt-henry.firebaseIO.com/databaseGameContainer")) ;

$scope.board = [{status:"Blank", pt:1}, {status:"Blank", pt:2},  {status:"Blank", pt:4},
				{status:"Blank", pt:8}, {status:"Blank", pt:16}, {status:"Blank", pt:32},
				{status:"Blank", pt:64},{status:"Blank", pt:128},{status:"Blank", pt:256}];

// init variables
$scope.gameStatus="Game On!";
$scope.moveCounter = 0;
$scope.p1Point = 0;
$scope.p2Point = 0;
$scope.wsWinCount = 0;
$scope.bsWinCount = 0;

// Special Sauce. My local stuffs that I want to load to Firebase
$scope.gameContainer = {
	boardArray: $scope.board,
	moveCount: $scope.moveCounter,
	notification: ""
};

// Angular stuffs. Connect my local stuffs to/from Firebase
$scope.remoteGameContainer.$bind($scope, "gameContainer");
$scope.$watch('gameContainer', function(){
	console.log('gameContainer changed!');
});

$scope.currentPlayer = function(who){
	if (who=="left") {
		$scope.playFirst ="W";
		$scope.playSecond ="B";
	} else if (who=="right") {
		$scope.playFirst ="B";
		$scope.playSecond ="W";
	}; 
};

// function Starts
$scope.playerPicks = function(thisCell){										// function playerPicks starts 
	if ((thisCell.status == "Blank") && ($scope.gameStatus=="Game On!")) {		// check for blank cells and game status is on.
		$scope.gameContainer.moveCount = $scope.gameContainer.moveCount + 1;	// increase move counter

			if (($scope.gameContainer.moveCount % 2) != 0){						// if move counter is odd, then it's X's move.
//				thisCell.status = "X";			
				thisCell.status = $scope.playFirst;
				$scope.p1Point = $scope.p1Point + thisCell.pt ;					// increase X points.
			} else if (($scope.gameContainer.moveCount % 2) == 0){				// if move counter is even, then it's O's move.
//				thisCell.status = "O";
				thisCell.status = $scope.playSecond;
				$scope.p2Point = $scope.p2Point + thisCell.pt ;					// increase O points.
			} ;

			var winPoint = [7,56,73,84,146,273,292,448];						// 8 possible winning points in array.

			for (var i=0; i<8; i++){											// Da Win Logic!
				if ((winPoint[i] & $scope.p1Point) == winPoint[i]){				// binary check winPoint & xPoint
					console.log("p1 win. from For loop.")						// if binary of winPoint & xPoint = winPoint
					$scope.firstPlayerWin();												// fire the xWin function
				};																
				if ((winPoint[i] & $scope.p2Point) == winPoint[i]){				// binary check winPoint & oPoint
					console.log("p2 win. from For loop.")						// if binary of winPoint & oPoint = winPoint
					$scope.secondPlayerWin();												// fire the oWin function
				};
			};

	}; // end if
		 	if ($scope.gameContainer.moveCount == 9) {							// fire gameover function when max move is reached
				$scope.gameOver();
			}; // end if


}; // function playerPicks ends

$scope.firstPlayerWin = function(){												// First player won
	$scope.gameStatus="First Player Won!";
		if ($scope.playFirst == "W") {
			$scope.showLeft = "White Spy Wins!";
			$scope.wsWinCount ++;
		} else if ($scope.playFirst == "B") {
			$scope.showRight = "Black Spy Wins!";
			$scope.bsWinCount ++;
		};
};

$scope.secondPlayerWin = function(){											// Second player won
	$scope.gameStatus="Second Player Won!";
		if ($scope.playSecond == "W") {
			$scope.showLeft = "White Spy Wins!";
			$scope.wsWinCount ++;
		} else if ($scope.playSecond == "B") {
			$scope.showRight = "Black Spy Wins!";
			$scope.bsWinCount ++;
		};
};

$scope.gameOver = function(){													// Game Over function
	$scope.gameStatus="G A M E  O V E R  !";
};

$scope.gameRestart = function(){												// Restart game
		console.log("gameRestart fired");
	$scope.gameContainer.boardArray = 	[{status:"Blank", pt:1}, {status:"Blank", pt:2},  {status:"Blank", pt:4},
										{status:"Blank", pt:8}, {status:"Blank", pt:16}, {status:"Blank", pt:32},
										{status:"Blank", pt:64},{status:"Blank", pt:128},{status:"Blank", pt:256}];
	// init variables
	$scope.gameStatus="Game On!";
	$scope.gameContainer.moveCount = 0;
	$scope.p1Point = 0;
	$scope.p2Point = 0;
};

}); // end of TTTController



// 			*** Win Logic Explaination ***
//	
//		 			 1 |   2 |  4    	<- row total 7pt
//					---------------
//		 			 8 |  16 | 32		<- row total 56pt
//					---------------
// 					64 | 128 | 256		<- row total 448pt
//		
//		 			^     ^     ^
// column total: 	73pt 146pt 292pt
// diagonal total: 	84pt and 273pt 
//
// Array winPoint = [7,56,73,84,146,273,292,448];	
//
// If X is on the top row, X gets a total of 7pt.
// Compare xPoint with winPoint by Binary. 7&7 = 7. 7 = one of the winning number in the array. so X wins.

//			*** OLD WORKING CODE ***
// --------------------------------------------------------------------------------------------------------------
// OLD WIN LOGIC
//			for (var i=0; i<8; i++) {
//				switch(winPoint[i] & $scope.xPoint){							// Win logic. Case match X points.
//					case 7 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 56 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 73 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 84 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 146 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 273 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 292 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					case 448 : thisCell.status = "X WINS!"; $scope.xWin(); break;
//					default: return;
//				};
//			
//				switch(winPoint[i] & $scope.oPoint){							// Win logic. Case match O points.
//					case 7 : thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 56 : thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 73 : thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 84 : thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 146: thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 273: thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 292: thisCell.status = "O WINS!"; $scope.oWin(); break;
//					case 448: thisCell.status = "O WINS!"; $scope.oWin(); break;
//					default: console.log("keep going");
//				};
//			};

// --------------------------------------------------------------------------------------------------------------
//thisCell.image = "images/bigX.png";
//thisCell.image = "images/bigO.png";
