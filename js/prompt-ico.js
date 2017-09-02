/*

  Runs on Homepage
  Popsup ICO after 8 seconds

*/

var openICOPrompt = function() {
  $('.encourage-ico-click').animate({
    'bottom': '0rem'
  }, 'fast', 'easeInOutCubic');
}

var closeICOPrompt = function() {
  $('.encourage-ico-click').animate({
    'bottom': '-500px'
  }, 'fast', 'easeInOutCubic', function() {
  });
}

var launchICOPrompt = function() {
  setTimeout(function() {
    if ($('body').hasClass('an-overlay-open') != true) {
      openICOPrompt()
    } else {
      launchICOPrompt();
    }
  }, 8000);
}


$(function() {

  launchICOPrompt();

  $('.encourage-ico-click .no-thanks').on('click', function(){
    closeICOPrompt();
  });

});
