<!--
//I got this script from Cut & Paste Javascript
//I have edited it quite a bit
//              
//                Girish Gupta

function Page(url,title,keywords,description) {
 while ((url.length > 0) && (url.charAt(0) == " ")) {
  url = url.substring(1,url.length);
 }
 this.url = url;
 while ((title.length > 0) && (title.charAt(0) == " ")) {
  title = title.substring(1,title.length);
 }
 this.title = title;
 this.keywords = keywords;
 this.description = description;
 return this;
}
function Database() {
 var pos = 0;
 while ((pos1 = amorphous.indexOf("$",pos)) != -1) {
  pos2 = amorphous.indexOf("|",pos1+1);
  pos3 = amorphous.indexOf("^",pos2+1);
  pos4 = amorphous.indexOf("*",pos3+1);
  if ((pos2 != -1)
  && (pos2 < pos3) && (pos3 < pos4)
  && (pos4 <= amorphous.indexOf("*",pos))) {
   this[database_length++] = new Page(amorphous.substring(pos,pos1),
   amorphous.substring(pos1+1,pos2),
   amorphous.substring(pos2+1,pos3),
   amorphous.substring(pos3+1,pos4));
   pos = pos4+1;
  } else { // error reading amorphous database
   if (pos+30 <= amorphous.length)
    alert('Error reading in amorphous database around "'
     + amorphous.substring(pos,pos+30) + '"');
   pos = amorphous.indexOf("*",pos) + 1;
  }
 }
 return this;
}
function search(str) {
 menu_length = 0;
 temp = new Object();
 temp_length = 0;
 words_length = 0;
 words = new Object();
 pos = 0;
 while ((pos = str.indexOf(" ")) != -1
 && and_search != "exact") {
  words[words_length] = str.substring(0,pos);
  if (words[words_length].length > 0)
   words_length++;
  if (str.length == 1)
   str="";
  else
   str = str.substring(pos+1,str.length);
 }
 if (str.length > 0)
  words[words_length++] = str;
 for (q=0;q<words_length;q++) {
  temp_length = 0;
  str = words[q].toLowerCase();
  len = (and_search=="and"&&q>0?menu_length:database_length);
  for (n=0; n<len; n++) {
   if (and_search=="and"&&q>0) {
    combo = (menu[n].title + " " + menu[n].description
     + " " + menu[n].keywords).toLowerCase();
   } else {
    combo = (database[n].title + " " + database[n].description
     + " " + database[n].keywords).toLowerCase();
   }
   if (combo.indexOf(str) != -1) // found
    temp[temp_length++] = (and_search=="and"&&q>0?menu[n]:database[n]);
  }
  if (and_search!="and" && q>0) {
   added = 0;
   for (i=0;i<temp_length;i++) {
    duplicate = false;
    for (j=0;j<menu_length&&!duplicate;j++) {
     if (menu[j] == temp[i]) {
      duplicate = true;
     }
    }
    if (!duplicate)
     menu[menu_length+(added++)] = temp[i];
   }

   menu_length += added;
  } else {
   for(h=0;h<temp_length;h++)
    menu[h] = temp[h];
   menu_length = temp_length;
  }
 }
}
function entry() {
 if ((document.entryform.keyword.value.length == 0)
 || (document.entryform.keyword.value == " ")) {
  alert("First you must enter a something to search for.");
  return false;
 }
 and_search = (document.entryform.and_or.selectedIndex == 0?"and":"or");
 if (document.entryform.and_or.selectedIndex == 2)
  and_search = "exact";
 location.href = location.pathname + "?"
  + escape(document.entryform.keyword.value)
  + (and_search != "or"?"&"+and_search:"");
 return false;
}
function redWord(str) {
 for(r=0; r<words_length; r++) {
  pos = -3;
  word = words[r].toLowerCase();
  while ((pos = str.toLowerCase().indexOf(word,pos+3)) != -1) {
   val = pos+word.length;
   str = str.substring(0,pos) + "*"
    + str.substring(pos,val) + "|"
    + str.substring(val,str.length);
  }
 }
 pos = -16;
 while ((pos = str.toLowerCase().indexOf("*",pos+16)) != -1)
  str = str.substring(0,pos) + "<font color=black>"
   + str.substring(pos+1,str.length);
 pos = -7;
 while ((pos = str.toLowerCase().indexOf("|",pos+7)) != -1)
  str = str.substring(0,pos) + "</font>"
   + str.substring(pos+1,str.length);
 return str;
}

var amorphous = document.database.list.value;
temp_str = amorphous.substring(amorphous.length-2,amorphous.length);
if (temp_str.indexOf("*") == -1)
 amorphous += "* ";
else
 amorphous += " "; // amorphous database must have characters after last asterisk

database_length = 0; // Netscape 2 fix
var database = new Database(); // read in from amorphous database

menu_length = 0; // Netscape 2 fix
var menu = new Object();

string = "";
and_search = "or";
if (location.search.length > 1) {
 string = unescape(location.search.substring(1,location.search.length));
 pos = 0;
 while ((pos = string.indexOf('"',pos)) != -1) {
  string = string.substring(0,pos) + '\\"' + string.substring(pos+1,string.length);
  pos += 2;
 }
 if (string.substring(string.length-4,string.length) == "&and") {
  string = string.substring(0,string.length-4);
  and_search = "and";
 } else if (string.substring(string.length-6,string.length) == "&exact") {
  string = string.substring(0,string.length-6);
  and_search = "exact";
 } else  if (string.substring(string.length-3,string.length) == "&or") {
  string = string.substring(0,string.length-3);
  and_search = "or";
 }
 search(string);
}

if (location.search.length > 1)
 document.write('</center>Your search for <b>'+string+'</b> came up with: <I>(click on the title to open the page)</I><br><br>\n');

for (n=0; n<menu_length; n++)
 document.write('<b><a href="'+menu[n].url+'">'+menu[n].title
 +'</a></b><br>'+redWord(menu[n].description)+'<br>Section of Music Mania: '
 +redWord(menu[n].keywords)+'<br><br>\n');
if ((menu_length == 0) && (location.search.length > 1))
 document.write('Nothing could be found that has anything to do with '+string+'!\n');
// -->