<!--
function validate_form() {
  validity = true; // assume valid
  if (!check_empty(document.form.NAME.value))
  	{ validity = false; alert('You need to type your name in.'); }
  if (!check_email(document.form.EMAIL.value))
  	{ validity = false; alert('Your E-Mail address is invalid.'); }
  if (!check_empty(document.form.COUNTRY.value))
  	{ validity = false; alert('You need to type your country in.'); }
  if (validity)
  	alert ("The needed entries have been filled in.  "
  		+ "Thankyou for filling out the software download form"
  		+ "");
  return validity;
}

function check_empty(text) {
  return (text.length > 0); // returns false if empty
}

function check_email(address) {
  if ((address == "")
    || (address.indexOf ('@') == -1)
    || (address.indexOf ('.') == -1))
      return false;
  return true;
}
// -->
