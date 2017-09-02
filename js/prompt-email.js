/*

  Runs on other pages
  Asks user for their email address after five seconds

*/

var askedForEmail, seenAskForEmail, timeToAsk;

var processFailedResponse = function() {
  localStorage.setItem('askedForEmail', true);
}

var processEmailResponse = function(email) {
  localStorage.setItem('askedForEmail', true);
}

var openEmailCapture = function(time) {
  if (time === 0) {
    openEmailCaptureNoAnimation();
  } else {
    openEmailCaptureAnimated();
  }
}

var openEmailCaptureAnimated = function() {
  setSeenAsk();
  $('.capture-email').animate({
    'bottom': '0rem'
  }, 'fast', 'easeInOutCubic');
}

var openEmailCaptureNoAnimation = function() {
  $('.ask-consent .btn-primary, .ask-consent .no-thanks').show();
  $('.capture-email').css('bottom', '0rem');
}

var openSecondSection = function() {
  $('.ask-consent').fadeOut(function(){
    $('.ask-email').fadeIn();
  })
}

var closeEmailCapture = function() {
  $('.capture-email').animate({
    'bottom': '-200px'
  }, 'fast', 'easeInOutCubic', function() {
    $('.ask-consent').show();
    $('.ask-email').hide();
  });

}

var setSeenAsk = function() {
  localStorage.setItem('seenAskForEmail', true);
}

var setDismissedAsk = function() {
  localStorage.setItem('askedForEmail', true);
}

var processSubmittedEmail = function() {
  setDismissedAsk();
}


$(function() {
  askedForEmail = localStorage.getItem('askedForEmail');
  seenAskForEmail = localStorage.getItem('seenAskForEmail');

  if (seenAskForEmail === 'true') {
    timeToAsk = 0;
  } else {
    timeToAsk = 4000;
  }

  $('.capture-email .no-thanks').on('click', function(){
    closeEmailCapture();
    setDismissedAsk();
  });

  $('.submit-email').on('click', processSubmittedEmail);

  $('.trigger-email-capture').on('click', function(event) {
    openEmailCapture();
    event.preventDefault();
    return false;
  });

  if (askedForEmail != 'true' && $('.featured-activity').length === 0) {
    setTimeout(function(){
      openEmailCapture(timeToAsk);
    }, timeToAsk);
  }

  $('body').on('keypress', function(keypress){
    if (keypress.keyCode === 33 || keypress.charCode === 33) { // Shift-1
      localStorage.setItem('askedForEmail', false);
      localStorage.setItem('seenAskForEmail', false);
    }
  })
});
