$(window).load(function() {
  var randomNumber = Math.floor(Math.random() * 101);
  var counter = $(".counter");
  var count = $(".count");
  var inputField = $(".input-field");
  var title = $(".title");
  var answer = $(".answer");
  var reveal = $(".reveal");
  var tries = 0;

  count.text(tries);

  $(".form").submit(function() {
    var inputNumber = parseFloat(inputField.val());
    tries ++;
    count.text(tries);

    if (validateInput(inputField.val(), inputNumber)) {
      if (matchedNumber(inputNumber, randomNumber)) {
        // somehow prevent the form from resubmitting if the correct answer was already guessed
        answer.text(winningMessage(message, tries));
      } else {
        message = "Nope! Try again"
        answer.text(message);
        inputField.val("");
      }
    }
    return false;
  });

  reveal.click(function() {
    $(this).replaceWith("<div class='number' >" + randomNumber + "</div>");
  });
});

var validateInput = function(rawInput, input) {
  if (isNaN(rawInput)) {
    message = "This isn't a number!";
    return false;
  } else {
    if (input === 0 || input % Math.floor(input) === 0) {
      if (input < 0) {
        message = "Your number is too low! Between 0 - 100 please.";
        return false;
      } else if (input > 100) {
        message = "Your number is too high! Between 0 - 100 please.";
        return false;
      } else {
        return true;
      }
    } else {
      message = "Whole numbers only please.";
      return false;
    }
  }
}

var matchedNumber = function(inputNumber, randomNumber) {
  if (inputNumber === randomNumber) {
    return true;
  } else {
    return false;
  }
}

var winningMessage = function(message, tries) {
  if (tries === 1) {
    return message = "Wow mind reader, you guessed correctly on your first guess!";
  } else if (tries >= 2) {
    return message = "Not bad it only took you " + tries + " guesses to guess the correct number";
  } else if (tries > 5) {
    return message = "You guessed correctly. It took you " + tries + " guesses to guess the correct number"
  }
}