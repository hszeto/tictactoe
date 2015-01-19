Second WDI project. (first project was tic tac toe.)

Project writen with Angular JS.

Game logic write in Javascript.

*** How To Play *** 
> Open index.html on browser. <br>
> Click white spy on the left or black spy on the right to start.<br>
> Click "Spy Again" to restart the game at any time. Will not affect Score counter.<br>
<br>
*** Win Logic Explaination ***<br>
//<br>	
//		 			 1 |   2 |  4    	<- row total 7pt<br>
//					---------------<br>
//		 			 8 |  16 | 32		<- row total 56pt<br>
//					---------------<br>
// 					64 | 128 | 256		<- row total 448pt<br>
//<br>
// column total: 	73pt 146pt 292pt<br>
// diagonal total: 	84pt and 273pt <br>
//<br>
// Array winPoint = [7,56,73,84,146,273,292,448];	<br>
//<br>
// For example, if X is on the top row, X gets a total of 7pt.<br>
// Compare xPoint with winPoint by Binary. 7&7 = 7. 7 = one of the winning number in the array. so X wins.
