#!/usr/bin/perl
##################################################################################
# Password Protector Script
# Copyright 1996 Techno Trade  http://www.technotrade.com
# Written By : Sammy Afifi   sammy@technotrade.com
# Date Last Modified : Oct 22, 1996
##################################################################################
#
# This script is free of charge for non-commercial sites.
# Please refer to our web site for registering this script for commercial use.
#
##################################################################################

# Change these variables with your own values
  $correctpass = "oasisbeachhoteldubai";
  $correcturl = "http://surf.to/GirishNet";
  $scriptlocation = "password.cgi";

# Read in form data
  &parse_form;

  $password =  $input{'password'};
  $function = $input{'function'};


  if ($function eq "post") {
       if ($password eq $correctpass) {
           &goto_url;
       }
       &badpassword;
   }
 
   &ask_password;


sub badpassword {
    print "Content-type: text/html\n\n";
    print "<HTML>\n";
    print "<HEAD><TITLE>Invalid Password</Title></HEAD>\n";
    print "<BODY BGCOLOR=#FFFFFF TEXT=#000000 LINK=#0000FF VLINK=#800040 ALINK=#800040>\n";
    print "<CENTER><H2>Your password is invalid</H2></CENTER><BR>\n";
    print "</BODY>\n";
    print "</HTML>\n";
    exit;
}

sub ask_password {
    print "Content-type: text/html\n\n";
    print "<HTML>\n";
    print "<HEAD><TITLE>Editor</Title></HEAD>\n";
    print "<BODY BGCOLOR=#FFFFFF TEXT=#000000 LINK=#0000FF VLINK=#800040 ALINK=#800040>\n";
    print "<Center><FONT SIZE=6 COLOR=0000A0><CODE>Please Enter Your Password</CODE></FONT>\n";
    print "<BR><BR><BR><TABLE WIDTH=75% Border=10><TR><TD><CENTER><BR>\n";
    print "<FORM ACTION=$scriptlocation>\n";
    print "<INPUT TYPE=password  NAME=password SIZE=15>\n";
    print "<INPUT TYPE=hidden NAME=function VALUE=post>\n";
    print "<INPUT TYPE=submit VALUE=\"   Verify Me   \">\n";
    print "</FORM>\n";
    print "</CENTER></TD></TR></TABLE>\n";
    print "</BODY></HTML>\n";

    exit;
}


sub goto_url {

    print "Location: $correcturl\n\n";
}

sub parse_form {

   read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
   if (length($buffer) < 5) {
         $buffer = $ENV{QUERY_STRING};
    }
   @pairs = split(/&/, $buffer);
   foreach $pair (@pairs) {
      ($name, $value) = split(/=/, $pair);

      $value =~ tr/+/ /;
      $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

      $input{$name} = $value;
   }
}
