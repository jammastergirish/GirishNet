// Set browser and version...
<!--
function createArray(n) {
this.length = n;
for(var j=0; j < n; j++) {
this[j] = new Image();
}
return this;
}
browser = navigator.appName;
ver = parseInt(navigator.appVersion);
if ((browser=="Netscape" && ver>= 3) || ((browser.indexOf("Microsoft Internet")
!= -1)&&ver>=4))
{       version = "js";}
else  {version = "noJS";}
if (version == "js") {
Imagelist =  new createArray(8);
Imagelist[0].src = "blue.gif";
Imagelist[1].src = "black.gif";
}
function rollover(r,i)
{
if(version == "js")
{
document [r].src = Imagelist[i].src;
}
}
//-->