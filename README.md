# jsfv-validation  
Simple front-end form validation with jsfv classes.  
Validates all fields having a class containing `jsfv`.

## Usage
Just include the script and add an eventlistener to the form like this  
```js
var form = document.getElementById('form1'); 
form.addEventListener("submit", jsfvValidate); 
```

After that you can validate your fields with below classes
```
jsfv-required : Cannot be empty
jsfv-name     : Should be a valid name (removes whitespace)
jsfv-email    : Should be a valid email (should have a@b)
jsfv-phone    : Should be a valid phone number
jsfv-message  : Should have at least X amount of characters
```

