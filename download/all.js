<!-- Hide from JavaScript-Impaired Browsers
/* This routine does not create an alert box.  Instead
   it simply replaces any words you decide are offensive
   at your Web Site with curse symbols. The "smut" string
   may be replaced with "xxx" or anything you deem more
   appropriate. The "cmp" string should be comprised only
   of words you don't wish to appear in postings or
   submissions at YOUR Web Site. (Some folks use this
   function to "bleep out" competitor's names) If you
   lengthen or shorten the list, be sure to change the
   stop number in the "for" loop (i<16 here, because 16
   words in the list.
   Don't forget a space after the last word in your own
   list of "forbidden" words. */ 
function smutEngine() {
 smut="#@&*%!#@&*%!#@&*%!";
 cmp="sex babes shit fuck damn porno cum cunt prick pecker "
 +"asshole pedophile man-boy man/boy dong twat ";
 txt=document.isn.dirt.value;
 tstx="";
 for (var i=0;i<16;i++){
  pos=cmp.indexOf(" ");
  wrd=cmp.substring(0,pos);
  wrdl=wrd.length
  cmp=cmp.substring(pos+1,cmp.length);
  while (txt.indexOf(wrd)>-1){
   pos=txt.indexOf(wrd);
   txt=txt.substring(0,pos)+smut.substring(0,wrdl)
   +txt.substring((pos+wrdl),txt.length);
  }
 }
 /* Here we have directed the output back to the
    same form element.  But you can put txt into
    a textarea window or simply save it for passing
    to a .cgi script on the server. */
 document.isn.dirt.value=txt;
}




 /* This is, at best, a perfunctory test of email address 
    entry validity.  Is there an "@" sign and sufficient
    letters prefixing it. Alert user if questioned. */
 function emailCheck() {
  txt=document.isn.email.value;
  if (txt.indexOf("@")<3){
   alert("I'm sorry. This email address seems wrong. Please"
   +" check the prefix and '@' sign.");
   return false;
  }
  return true;
 }
 
 
 
 
 
 function htmlOut(){
  txt=document.isn.html.value;
  ctr=0;
  while ((txt.indexOf("<")>-1)&&(ctr<4)){
   pos=txt.indexOf("<");
   txt=txt.substring(0,pos)+"&lt;"+txt.substring(pos+1,txt.length);
   ctr++;
   }
  while (txt.indexOf(">")>-1){
   pos=txt.indexOf(">");
   txt=txt.substring(0,pos)+"&gt;"
   +txt.substring(pos+1,txt.length);
   }
  document.isn.html.value=txt;
 }
 
 
 
 
 
 function capsLc(){
  /* Unfortunately, some of the more esoteric parsing
     is misread by the 2.x, but is fine with the 3.x,
     so a branch is required.  The old version does not
     parse and correct conjunctions and prepositions to
     lower case at the end of a sentence or next to
     quote marks. 'Bout the only difference... */
  if (navigator.appVersion.substring(0,1)=="2"){
   navOld();
   }
   else navNew();
  }
 function navOld(){
  txt=document.isn.caps.value+" ";
  txt=txt.toLowerCase();
  txtl="";
  while ((txt.length>0)&&(txt.indexOf(" ")>-1)){
   pos=txt.indexOf(" ");
   wrd=txt.substring(0,pos);
   cmp=" "+wrd+" ";
   if (tst.indexOf(cmp)<0){
    ltr=wrd.substring(0,1);
    ltr=ltr.toUpperCase();
    wrd=ltr+wrd.substring(1,wrd.length);
    }
   txtl+=wrd+" "; 
   txt=txt.substring((pos+1),txt.length);
   }
  ltr=txtl.substring(0,1);
  ltr=ltr.toUpperCase();
  txtl=ltr+txtl.substring(1,txtl.length-1);
  document.isn.caps.value=txtl;
 }
 function navNew(){
  txt=document.isn.caps.value+" ";
  txt=txt.toLowerCase();
  txtl="";
  tst=" in into of on onto with within by to for the "
  +"at upon over under and or a ";
  punc=",.?!:;)'";
  punc+='"';
  while ((txt.length>0)&&(txt.indexOf(" ")>-1)){
   pos=txt.indexOf(" ");
   wrd=txt.substring(0,pos);
   wrdpre="";
   if (punc.indexOf(wrd.substring(0,1))>-1){
    wrdpre=wrd.substring(0,1);
    wrd=wrd.substring(1,wrd.length);
    }
   cmp=" "+wrd+" ";
   for (var i=0;i<9;i++){
    p=wrd.indexOf(punc.substring(i,i+1));
    if (p==wrd.length-1){
     cmp=" "+wrd.substring(0,wrd.length-1)+" ";
     i=9;
     }
    }
   if (tst.indexOf(cmp)<0){
    ltr=wrd.substring(0,1);
    ltr=ltr.toUpperCase();
    wrd=ltr+wrd.substring(1,wrd.length);
    }
   txtl+=wrdpre+wrd+" "; 
   txt=txt.substring((pos+1),txt.length);
   }
  ltr=txtl.substring(0,1);
  ltr=ltr.toUpperCase();
  txtl=ltr+txtl.substring(1,txtl.length-1);
  document.isn.name.value=txtl;
 }




 // empty entry checker
 function noEntry(){
  mt=document.isn.empty.value;
  if ((mt.length<1)||(mt.substring(0,6)=="******")){
   alert("I'm sorry. Any entry containing '******' "
    +"must be completed before I can submit this for"
    +"m for processing.");
   return false;
  }
  return true;
 }
 var nr=0;
 function numericCheck(){
  nr1=document.isn.nr.value;
  flg=0;
  str="";
  spc=""
  arw="";
  for (var i=0;i<nr1.length;i++){
   cmp="0123456789"
   tst=nr1.substring(i,i+1)
   if (cmp.indexOf(tst)<0){
    flg++;
    str+=" "+tst;
    spc+=tst;
    arw+="^";
   }
   else{arw+="_";}
  }
  if (flg!=0){
   if (spc.indexOf(" ")>-1) {
    str+=" and a space";
    }
   alert(nr1+"\r"+arw+"\rI'm sorry. This entry must "
   +"be a number. I found "+flg+" unacceptable: "+str+".");
   return false;
  }
  return true;
 }
// End Hiding -->