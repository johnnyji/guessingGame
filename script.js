$(window).load(function() {
  var randomNumber = Math.floor(Math.random() * 101);
  var counter = $(".counter");
  var count = $(".count");
  var inputField = $(".input-field");
  var title = $(".title");
  var answer = $(".answer");
  var reveal = $(".reveal");
  var restart = $(".restart");
  var form = $(".form");
  var tries = 0;
  answer.text("I bet you wont get it!");

  count.text(tries);

  form.submit(function(e) {
    e.preventDefault();
    var message;
    var inputNumber = parseFloat(inputField.val());
    var validNumber = inputIsValid(inputField.val(), inputNumber);
    tries ++;
    count.text(tries);
    if (answer.hasClass("error")) {
      answer.removeClass("error");
    }

    if (validNumber === true) {

      if (numberIsMatched(inputNumber, randomNumber)) {
        if (answer.hasClass("error")) {
          answer.removeClass("error");
        }
        answer.text(winningMessage(message, tries));
        $(this).fadeOut(300);
        restart.fadeIn();
      } else {
        answer.addClass("error").text("Nope! Try again");
        inputField.val("");
      }

    } else {
      answer.addClass("error");
      answer.text(validNumber);
      inputField.val("");
    }
  });

  reveal.click(function() {
    $(this).replaceWith("<div class='number' >" + randomNumber + "</div>");
    return false;
  });

  restart.click(function() {
    location.reload();
  });
});

var inputIsValid = function(rawInput, input) {
  var message;
  if (isNaN(rawInput)) {
    message = "That isn't a number!";
    return message;
  } else {
    if (input === 0 || input % Math.floor(input) === 0) {
      if (input < 0) {
        message = "Your number is too low! Between 0 - 100 please.";
        return message;
      } else if (input > 100) {
        message = "Your number is too high! Between 0 - 100 please.";
        return message;
      } else {
        return true;
      }
    } else {
      message = "Whole numbers only please.";
      return message;
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