const changeTextBtn = document.querySelector(".changeText");
const readTextBtn = document.querySelector(".readText");
const code = document.querySelector("#code");
const input = document.querySelector(".userInput input");
const submitbtn = document.querySelector(".btn");

changeTextBtn.addEventListener("click", () => {
  code.textContent = createCaptcha();
});
window.addEventListener("load", () => {
  reloadCaptcha();
  setInterval(reloadCaptcha, 25000);
});

// Function to reload captcha
function reloadCaptcha() {
  code.textContent = createCaptcha();
  input.value = ""; // Clear the input field when reloading
}

// For captcha
function createCaptcha() {
  let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

let code = ''
for(let i = 0; i<6; i++)
{
  let temp = letters[Math.floor(Math.random() * letters.length)]
  if(temp!=undefined)
    code = code + temp
}
return code
}

// For speaking the captcha
function speakCaptcha() {
  let text = "";
  for (let i = 0; i <= code.textContent.length; i++) {
    text += code.textContent.charAt(i) + " ";
  }
  return text;
}

//to check whether entered captcha is valid
function validcaptcha() {
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  let val = input.value;
  if (val == "") {
    swal({
      title: "CAPTCHA NOT FOUND!",
      text: "Please enter the Text!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Please Enter the Captcha");
  } else if (val == code.textContent) {
    swal({
      title: "VALID CAPTCHA!",
      text: "The captcha entered is valid!",
      icon: "success",
      button: "Proceed",
    });
    responsiveVoice.speak("Valid Captcha");
    // confirm("Captcha is correct! Do you want to proceed?");
    reloadCaptcha();
  } else {
    swal({
      title: "CAPTCHA INVALID!",
      text: "Please enter correct text!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Invalid Captcha");
    confirm("Captcha is incorrect, please try again.");
    reloadCaptcha();
  }
}

//TEXT TO SPEECH RECOGNITION
submitbtn.addEventListener("click", () => {
  validcaptcha();
});

//for keydown===enter case
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validcaptcha();
  }
});

readTextBtn.addEventListener("click", () => {
  let tex = speakCaptcha();
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  responsiveVoice.speak(tex);
  responsiveVoice.speak("Please repeat the captcha");
});

// Add an event listener to the 'changeTextBtn' button for the 'click' event
changeTextBtn.addEventListener("click", () => {
  // Update the text content of the 'code' element with a new captcha generated by 'createCaptcha'
  code.textContent = createCaptcha();
  // Clear the value of the 'input' element to reset the input box
  input.value = "";
});