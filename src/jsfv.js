/** 
 * Javascript form validation with jsfv classes
 * Validate all fields having a class containing jsfv
 * 
 * Possible validations:
 * - jsfv-required : Cannot be empty
 * - jsfv-name     : Should be a valid name (removes whitespace)
 * - jsfv-email    : Should be a valid email (should have a@b)
 * - jsfv-phone    : Should be a valid phone number
 * - jsfv-message  : Should have at least X amount of characters
 * 
 * @author Bob vrijland <b.vrijland@esens.nl>
 * @namespace jsfv
 */

/**
 * Validates form fields according to their classnames
 * 
 * @returns submit
 */
function jsfvValidate() {
   event.preventDefault();
   const form = event.target;
   const fieldCollection = form.querySelectorAll('[class*="jsfv-"]');
   let passedValidation = true;

   jsfvRemoveErrors(form);

   if (fieldCollection.length <= 0) {
      form.submit();
   }

   for (let field of fieldCollection) {
      let next = true;

      if (field.classList.contains("jsfv-required") && next) {
         if (!jsfvRequired(field)) { passedValidation = false; next = false; }
      }
      if (field.classList.contains("jsfv-name") && next) {
         if (!jsfvName(field)) { passedValidation = false; next = false; }
      }
      if (field.classList.contains("jsfv-email") && next) {
         if (!jsfvEmail(field)) { passedValidation = false; next = false; }
      }
      if (field.classList.contains("jsfv-phone") && next) {
         if (!jsfvPhone(field)) { passedValidation = false; next = false; }
      }
      if (field.classList.contains("jsfv-message") && next) {
         if (!jsfvMessage(field)) { passedValidation = false; next = false; }
      }
      if (field.classList.contains("jsfv-agree") && next) {
         if (!jsfvAgree(field)) { passedValidation = false; next = false; }
      }
   }

   if (passedValidation) {
      form.submit();
   }

}

/**
 * Removes whitespace and gives an error message and
 * return false if the field is empty.
 *
 * @param {*} field the input field that should be validated
 * @returns bool
 */
function jsfvRequired(field) {
   field.value = field.value.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/, " ")
   if (field.value == "") {
      const id = jsfvRandomId();
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedBy", id);
      field.classList.add('jsfv-error');
      jsfvErrorMessage(field, id, "Dit veld is verplicht.")
      return false;
   }
   return true;
}

/**
 * A regex for names could upset people with special characters in their name
 * So we use this to just strip leading and trailing blanks and collapse
 * consecutive blanks. Could also remove some weird characters here if needed.
 *
 * @param {*} field the input field that should be validated
 * @returns bool 
 */
function jsfvName(field) {
   let name = field.value;
   name = name.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/, " ")
   field.value = name;
   return true;
}

/**
 * There are times where you need a checkbox to be checked to continue
 * Use this for privacy policy boxes or other mandatory agreements.
 *
 * @param {*} field the input field that should be validated
 * @returns bool 
 */
 function jsfvAgree(field) {
   if (field.checked){
      return true;
   } else {
      const id = jsfvRandomId();
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedBy", id);
      field.classList.add('jsfv-error');
      jsfvErrorMessage(field, id, "U moet akkoord gaan om door te gaan.")
      return false;
   }
   
}

/**
 * Gives an error message and return false if the field not a valid email.
 * We are just checking for a character before and after @
 *
 * @param {*} field the input field that should be validated
 * @returns bool
 */
function jsfvEmail(field) {
   const regex = /\S+@\S+/;
   if (field.value !== "") {
      if (!regex.test(field.value)) {
         const id = jsfvRandomId();
         field.setAttribute("aria-invalid", "true");
         field.setAttribute("aria-describedBy", id);
         field.classList.add('jsfv-error');
         jsfvErrorMessage(field, id, "Dit is geen geldig e-mailadres.")
         return false;
      }
   }
   return true;
}

/**
 * Gives an error message and return false if the field not a valid phone number or
 * less than 6 characters are given.
 *
 * @param {*} field the input field that should be validated
 * @returns bool
 */
function jsfvPhone(field) {
   const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
   if (field.value != "") {
      if (!regex.test(field.value) || field.value.length < 6) {
         const id = jsfvRandomId();
         field.setAttribute("aria-invalid", "true");
         field.setAttribute("aria-describedBy", id);
         field.classList.add('jsfv-error');
         jsfvErrorMessage(field, id, "Dit is geen geldig telefoonnummer.")
         return false;
      }
   }
   return true;
}

/**
 * Gives an error message and return false if the doesn't meet the minimum
 * required amount of characters
 *
 * @param {*} field the input field that should be validated
 * @param {*} char the minimum amount of characters
 * @returns bool
 */
function jsfvMessage(field, char = 10) {
   if (field.value.length < char) {
      const id = jsfvRandomId();
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedBy", id);
      field.classList.add('jsfv-error');
      jsfvErrorMessage(field, id, "Het bericht is te kort, gebruik meer woorden.")
      return false;
   }
   return true;
}

/**
 * Removes previous errors given
 *
 * @param {*} form the form where the errors should be removed
 */
function jsfvRemoveErrors(form) {
   const errorFields = form.querySelectorAll(".jsfv-error");
   const errorMessages = form.querySelectorAll(".jsfv-errormsg")
   for (let field of errorFields) {
      field.classList.remove("jsfv-error");
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedBy");
   }
   for (let msg of errorMessages) {
      msg.remove();
   }
   return;
}

/**
 * Makes the error message and puts it in the correct position.
 * Default position is a span after the input field.
 *
 * @param {field} field the field the error belongs to
 * @param {*} id an id to be added to the error
 * @param {*} message the message that should be shown
 */
function jsfvErrorMessage(field, id, message) {
   let node = document.createElement("span");
   let content = document.createTextNode(message);
   node.className = "jsfv-errormsg";
   node.id = id;
   node.appendChild(content);
   field.insertAdjacentElement('afterend', node);
}

/**
 * Returns a random generated string to be used as ID
 * 
 * @returns random id
 */
function jsfvRandomId() {
   return '_' + Math.random().toString(36).substr(2, 9);
}
