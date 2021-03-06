var TTT = angular.module('TTT', ["firebase"]);

TTT.controller('TTTController', function($scope, $firebase){

$scope.remoteGameContainer = 												// Define the location to Firebase
  $firebase(new Firebase("https://ttt-henry.firebaseIO.com/databaseGameContainer")) ;
  //$firebase(new Firebase("https://ttt-henry.firebaseIO.com/databaseGameContainer")) ;
  																			// Initial cell condition
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
$scope.playFirst ="W";
$scope.playSecond ="B";

// Special Sauce. My local stuffs that I want to load to Firebase
$scope.gameContainer = {
	boardArray: $scope.board,
	gameSta: $scope.gameStatus,      // $scope.gameContainer.gameSta ~ $scope.gameStatus
	moveCount: $scope.moveCounter,

	p1Pt: $scope.p1Point,
	p2Pt: $scope.p2Point,
	wsWinC: $scope.wsWinCount,
	bsWinC: $scope.bsWinCount,
	play1st: $scope.playFirst,
	play2nd: $scope.playSecond,
	notification: ""
};

// Angular stuffs. Connect my local stuffs to/from Firebase
$scope.remoteGameContainer.$bind($scope, "gameContainer");
$scope.$watch('gameContainer', function(){
	console.log('gameContainer changed!');
});

$scope.currentPlayer = function(who){											// Determine left or right side play first.
	if ((who=="left") && ($scope.gameContainer.moveCount == 0)) {
		$scope.gameContainer.play1st ="W";
		$scope.gameContainer.play2nd ="B";
	} else if ((who=="right") && ($scope.gameContainer.moveCount == 0)) {
		$scope.gameContainer.play1st ="B";
		$scope.gameContainer.play2nd ="W";
	}; 
};

// function Starts
$scope.playerPicks = function(thisCell){										// function playerPicks starts 
	if ((thisCell.status == "Blank") && ($scope.gameContainer.gameSta=="Game On!")) {		// check for blank cells and game status is on.
		$scope.gameContainer.moveCount = $scope.gameContainer.moveCount + 1;	// increase move counter

			if (($scope.gameContainer.moveCount % 2) != 0){						// if move counter is odd, then it's P1 move.
//				thisCell.status = "X";	
				thisCell.status = $scope.gameContainer.play1st;
				$scope.gameContainer.p1Pt = $scope.gameContainer.p1Pt + thisCell.pt ;					// increase P1 points.
			} else if (($scope.gameContainer.moveCount % 2) == 0){				// if move counter is even, then it's P2 move.
//				thisCell.status = "O";
				thisCell.status = $scope.gameContainer.play2nd;
				$scope.gameContainer.p2Pt = $scope.gameContainer.p2Pt + thisCell.pt ;					// increase P2 points.
			} ;

			var winPoint = [7,56,73,84,146,273,292,448];						// 8 possible winning points in array.

			for (var i=0; i<8; i++){											// The Win Logic!
				if ((winPoint[i] & $scope.gameContainer.p1Pt) == winPoint[i]){				// Binary check winPoint & first player point
					console.log("p1 win. from For loop.")						// If binary of winPoint & p1Point = winPoint
					$scope.firstPlayerWin();												// fire the xWin function
				};																
				if ((winPoint[i] & $scope.gameContainer.p2Pt) == winPoint[i]){				// Binary check winPoint & second player point
					console.log("p2 win. from For loop.")						// If binary of winPoint & p2Point = winPoint
					$scope.secondPlayerWin();												// fire the oWin function
				};
			};

	}; // end if
		 	if ($scope.gameContainer.moveCount == 9) {							// Fire game-over function when max move is reached
				$scope.gameOver();
			}; // end if


}; // function playerPicks ends

$scope.firstPlayerWin = function(){												// First player won
	$scope.gameContainer.gameSta="First Player Wins!";
		if ($scope.gameContainer.play1st == "W") {
			$scope.showLeft = "White Spy Wins!";
			$scope.gameContainer.wsWinC ++;
		} else if ($scope.gameContainer.play1st == "B") {
			$scope.showRight = "Black Spy Wins!";
			$scope.gameContainer.bsWinC ++;
		};
};

$scope.secondPlayerWin = function(){											// Second player won
	$scope.gameContainer.gameSta="Second Player Wins!";
		if ($scope.gameContainer.play2nd == "W") {
			$scope.showLeft = "White Spy Wins!";
			$scope.gameContainer.wsWinC ++;
		} else if ($scope.gameContainer.play2nd == "B") {
			$scope.showRight = "Black Spy Wins!";
			$scope.gameContainer.bsWinC ++;
		};
};

$scope.gameOver = function(){													// Game Over function
	$scope.gameContainer.gameSta="TIE! Game Over!";
};

$scope.gameRestart = function(){												// Restart game
	$scope.gameContainer.boardArray = 	[{status:"Blank", pt:1}, {status:"Blank", pt:2},  {status:"Blank", pt:4},
										{status:"Blank", pt:8}, {status:"Blank", pt:16}, {status:"Blank", pt:32},
										{status:"Blank", pt:64},{status:"Blank", pt:128},{status:"Blank", pt:256}];
	// init variables
	$scope.gameContainer.gameSta="Game On!";
	$scope.gameContainer.moveCount = 0;
	$scope.gameContainer.p1Pt = 0;
	$scope.gameContainer.p2Pt = 0;
	$scope.showLeft = "";
	$scope.showRight= "";
};

}); // end of TTTController

//--------------------------------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------------------------
// 			*** Possible Player vs Computer logic ***
// $scope.vsComp = function (comp){
//	var boardPosition=[1,2,4,8,16,32,64,128,256];
//	$scope.compPick = boardPosition[Math.floor(Math.random() * 9)];
// };