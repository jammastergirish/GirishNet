<!--
// enter full or relative URL to your search page
var search_htm_url = "index.htm";

function searchPage() {
 if ((document.searchpage.keyword.value.length == 0)
 || (document.searchpage.keyword.value == " ")) {
  alert("First you must enter a keyword to search for.");
 } else {
  sel = document.searchpage.and_or.selectedIndex;
  location.href = search_htm_url + "?"
   + escape(document.searchpage.keyword.value)
   + (sel==0?"&and":(sel==2?"&exact":"&or"));
 }
 return false;
}

document.write('<form name="searchpage" onSubmit="return searchPage()">'
 +'<input type="text" size=20 name="keyword" style="BACKGROUND-COLOR: #3E7DA8; FONT-FAMILY: verdana; color: #ffffff; FONT-SIZE: 12px"> '
 +'<input type="button" value="Search" onClick="searchPage()" style="BACKGROUND-COLOR: #3E7DA8; FONT-FAMILY: verdana; color: #ffffff; FONT-SIZE: 12px"><br>'
 +'<select name="and_or" size="1" style="BACKGROUND-COLOR: #3E7DA8; FONT-FAMILY: verdana; color: #ffffff; FONT-SIZE: 11px"><option>find all words (AND)<option>find any word '
 +'(OR)<option>exact match</select></form>');
// -->