/********************************************************************************
This script is made by and copyrighted to Thomas Brattli at www.bratta.com
Visit for more great scripts. 
This may be used freely as long as this msg is intact!
********************************************************************************
Browsercheck:*/
ie=document.all?1:0
n=document.layers?1:0

//These are the variables you have to set:

//How much of the layer do you wan't to be visible when it's in the upstate?
lshow=20

//How many pixels should it move every step? 
var move=10;

//At what speed (in milliseconds, lower value is more speed)
menuSpeed=40

//Do you want it to move with the page if the user scroll the page?
var moveOnScroll=true

/********************************************************************************
You should't have to change anything below this.
********************************************************************************/
//Defining variables
var tim;

//Object constructor
function makeMenu(obj,nest){
    nest=(!nest) ? '':'document.'+nest+'.'
    this.css=(n) ? eval(nest+'document.'+obj):eval(obj+'.style')					
	this.state=1
	this.go=0
	this.height=n?this.css.document.height:eval(obj+'.offsetHeight')
	this.top=b_gettop
    this.obj = obj + "Object"; 	eval(this.obj + "=this")	
}
//Get's the top position.
function b_gettop(){
	var gleft=(n) ? eval(this.css.top):eval(this.css.pixelTop);
	return gleft;
}
/********************************************************************************
Deciding what way to move the menu (this is called onmouseover, onmouseout or onclick)
********************************************************************************/
function moveMenu(){
	if(!oMenu.state){
		clearTimeout(tim)
		mIn()	
	}else{
		clearTimeout(tim)
		mOut()
	}
}
//Menu in
function mIn(){
	if(oMenu.top()>eval(scrolled)-oMenu.height+lshow){
		oMenu.go=1
		oMenu.css.top=oMenu.top()-move
		tim=setTimeout("mIn()",menuSpeed)
	}else{
		oMenu.go=0
		oMenu.state=1
	}	
}
//Menu out
function mOut(){
	if(oMenu.top()<eval(scrolled)){
		oMenu.go=1
		oMenu.css.top=oMenu.top()+move
		tim=setTimeout("mOut()",menuSpeed)
	}else{
		oMenu.go=0
		oMenu.state=0
	}	
}
/********************************************************************************
Checking if the page is scrolled, if it is move the menu after
********************************************************************************/
function checkScrolled(){
	if(!oMenu.go)oMenu.css.top=(!oMenu.state)?eval(scrolled):eval(scrolled)-oMenu.height+lshow
	if(n) setTimeout('checkScrolled()',30)
}
/********************************************************************************
Inits the page, makes the menu object, moves it to the right place, 
show it..
********************************************************************************/
function menuInit(){
	oMenu=new makeMenu('divMenu')
	scrolled=n?"window.pageYOffset":"document.body.scrollTop"
	oMenu.css.top=eval(scrolled)-oMenu.height+lshow
	oMenu.css.visibility='visible'
	if(moveOnScroll) ie?window.onscroll=checkScrolled:checkScrolled();
}

//Initing menu on pageload
onload=menuInit;