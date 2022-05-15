const generatePasswordButton = document.getElementById('generate-password');
const passwordResultsInputs = document.querySelectorAll('.password-results__output');

// Set default password length if empty
let passwordLength = 12;
const passwordCharacters = [
   'a','A',
   'b','B',
   'c','C',
   'd','D',
   'e','E',
   'f','F',
   'g','G',
   'h','H',
   'i','I',
   'j','J',
   'k','K',
   'l','L',
   'm','M',
   'n','M',
   'o','O',
   'p','P',
   'q','Q',
   'r','R',
   's','S',
   't','T',
   'u','U',
   'v','V',
   'w','W',
   'x','X',
   'y','Y',
   'z','Z',
   '0','1','2','3','4','5','6','7','8','9',
   '!','@','#','$','%','^','&','*'
]

function handleGeneratePassword() {

   const generatedPassword01 = document.getElementById('password-results__01');
   const generatedPassword02 = document.getElementById('password-results__02');
   const generatedPassword03 = document.getElementById('password-results__03');
   const generatedPassword04 = document.getElementById('password-results__04');

   // Reset passwords
   let password01 = '';
   let password02 = '';
   let password03 = '';
   let password04 = '';
   const passwordLengthInput = document.getElementById('password-length__input');

   // Get user password length if exists and is an integer, otherwise set to 12
   if (passwordLengthInput.value && parseInt(passwordLengthInput.value) && passwordLengthInput.value > 0) {
      passwordLength = passwordLengthInput.value;
   } else {
      passwordLength = 12;
      passwordLengthInput.value = 12;
   }

   // Generate random passwords for all 4 text fields
   for (let i = 1; i <= passwordLength; i++) {
      password01 += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
      password02 += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
      password03 += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
      password04 += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
   }

   // Push passwords to text inputs
   generatedPassword01.value = password01;
   generatedPassword02.value = password02;
   generatedPassword03.value = password03;
   generatedPassword04.value = password04;

   passwordResultsInputs.forEach(input => {
      input.removeAttribute('disabled');
   })

}

// Copy generated passwords to clipboard
function copy(e) {
   const copyText = e.currentTarget.value;
   e.currentTarget.select();
     
   // if browser does not support the navigator.clipboard API, use the deprecated execCommand
   if (!navigator.clipboard) {
      document.execCommand("copy");
   } else{
      navigator.clipboard.writeText(copyText).then (function(){

         // Display copied password to user in alert for 2 seconds
         const copiedPassword = document.getElementById('copied-password');
         copiedPassword.textContent = copyText;
         const status = document.querySelector('.status');
         status.classList.add('active');
         setTimeout(() => {
            status.classList.remove('active');
          }, 2000);
          
      })
      .catch (function() {
         console.log('Error copying password'); // error
      });
   }


}

// Event handler for generate password button
generatePasswordButton.addEventListener('click', handleGeneratePassword);

// Event handler for copying passwords
passwordResultsInputs.forEach(password => {
   password.addEventListener('focus', copy);
});