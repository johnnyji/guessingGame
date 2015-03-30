$(window).load(function() {
  var randomNumber = Math.floor(Math.random() * 101);
  var counter = $(".counter");
  var count = $(".count");
  var inputField = $(".input-field");
  var title = $(".title");
  var answer = $(".answer");
  var reveal = $(".reveal");
  var form = $(".form");
  var tries = 0;

  count.text(tries);

  form.submit(function(e) {
    e.preventDefault();
    var inputNumber = parseFloat(inputField.val());
    tries ++;
    count.text(tries);
    if (answer.hasClass("error")) {
      answer.removeClass("error");
    }

    if (inputIsValid(inputField.val(), inputNumber)) {

      if (numberIsMatched(inputNumber, randomNumber)) {
        if (answer.hasClass("error")) {
          answer.removeClass("error");
        }
        answer.text(winningMessage(message, tries));
      } else {
        answer.addClass("error").text("Nope! Try again");
        inputField.val("");
      }

    } else {
      answer.addClass("error");
      answer.text(message);
      inputField.val("");
    }
  });

  reveal.click(function() {
    $(this).replaceWith("<div class='number' >" + randomNumber + "</div>");
    return false;
  });
});

var inputIsValid = function(rawInput, input) {
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

var numberIsMatched = function(inputNumber, randomNumber) {
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