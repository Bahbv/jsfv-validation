/** 
 * Javascript form validation with jsfv classes
 * Validate all fields having jsfv-validate class
 * 
 * Possible validations:
 * - jsfv-required : Cannot be empty
 * - jsfv-name     : Should be a valid name
 * - jsfv-email    : Should be a valid email (RFC822)
 * - jsfv-phone    : Should be a valid phone number
 * - jsfv-message  : Should have at least X amount of characters
 * 
 */

 /**
  * Add the eventlisteners for the form's.
  * Initialise some basic variables
  * Could use a htmlcollection to iterate over.
  */
 var form = document.getElementById('form1');
 form.addEventListener("submit", jsfvValidate);

 /**
  * Validates form fields according to their classnames
  * 
  * @returns submit
  */
 function jsfvValidate(){
    event.preventDefault();
    var passedValidation = true;
    var form = event.target;
    var fieldCollection = form.querySelectorAll("*[class^='jsfv-']");
    console.log(fieldCollection);
    if (fieldCollection.length <= 0){
        return;
    }

    for (let field of fieldCollection) {
       if (field.classList.contains("jsfv-required")){
            if (!jsfvRequired(field)){ passedValidation = false; }
       }
       if (field.classList.contains("jsfv-name")) {
            if (!jsfvName(field)){ passedValidation = false; }
       } 
       if (field.classList.contains("jsfv-email")) {
            if (!jsfvEmail(field)){ passedValidation = false; }
       } 
       if (field.classList.contains("jsfv-phone")) {
            if (!jsfvPhone(field)){ passedValidation = false; }
       } 
       if (field.classList.contains("jsfv-message")) {
            if (!jsfvMessage(field)){ passedValidation = false; }
       }
    }

    if (passedValidation){
        form.submit();
    }

 }

 /**
  * Gives an error message and return false if the field is empty.
  *
  * @param {*} field
  * @returns bool
  */
 function jsfvRequired(field){
    if (field.value == ""){
        field.classList.add('jsfv-error');
        return false;
    } 
    return true;
 }

 /**
  * Gives an error message and return false if the is not a valid name.
  *
  * @param {*} field
  * @returns bool
  */
 function jsfvName(field){
    return true;
 }

 /**
  * Gives an error message and return false if the field not a valid email.
  * Uses (RFC822)
  *
  * @param {*} field
  * @returns bool
  */
 function jsfvEmail(field){
    return true;
 }

 /**
  * Gives an error message and return false if the field not a valid email.
  * Uses (RFC822)
  *
  * @param {*} field
  * @returns bool
  */
 function jsfvPhone(field){
    return true;
 }

 /**
  * Gives an error message and return false if the doesn't meet the minimum
  * required amount of characters
  *
  * @param {*} field
  * @param {*} char
  * @returns bool
  */
 function jsfvMessage(field,char = 10){
    return true;
 }