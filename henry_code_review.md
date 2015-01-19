###Henry Code Review

####_style.css_

* Remove all unused comments or lines of code that have been commented out from a production deploy

```
#top_div{
/*	background-color: grey;
*/
	width: 960x;
	margin-bottom: 10px;
/*	border: 1px solid lightgrey;
*/
}

```
In the above code block the first and last lines need to be removed if they are not being used. 

* As a matter of style, it is also preferable to name our classes #top-div instead of #top_div...this is how the pros do it so this is how we should do it. 

* Also group sections of css as logically as possible, and seperate these sections with comments..for example : 

```
/****Universal****/

*{ margin:0}
body { height:100% }

/****Navigation****/
a:hover { background-color:white}
```
####_index.html_

* Remember, it is not considered a best practice to load scripts synchrounously in the head tag. If scripts do not use document.write or manipulate the DOM, consider placing them before the end of the body tag, you pages will load faster. Best practice would be to use <script src="my.js" async> 

```
<h2>{{gameContainer.gameSta}}</h2>
```

* In the above snippet, .gameSta is not what I would consider a descriptive name. Don't be afraid to use more charachters to make your variable descriptions easier to read and understand. 

* Again, remember to remove commented out lines of code from bottom of file

####_main.js_

* In a couple places I see the following code

```
if ((who=="left") && ($scope.gameContainer.moveCount == 0)) {
		$scope.gameContainer.play1st ="W";
		$scope.gameContainer.play2nd ="B";
	} else if ((who=="right") && ($scope.gameContainer.moveCount == 0)) {
		$scope.gameContainer.play1st ="B";
		$scope.gameContainer.play2nd ="W";
	}; 
```

In the case of above we actually want to do 

```
if ( some logic) {}
else {}
```
We don't want to use else if, unless there is a following else block. In other words if there are two possible states, use if else, if there are three or more possible states, then if, else if, and else will work. 

* Overall great job with this file!! Comments look good and our representative of what is happening in the code. 
