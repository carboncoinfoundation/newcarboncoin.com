
var createScroll = function(jqel, scrollOffset, animLength) {
  var target = jqel.attr('href');
  $(window).scrollTo(target, {
    interrupt: true,
    offset: {
      top: scrollOffset
    },
    duration: animLength,
    easing: 'easeInOutCubic'
  });
}

$(function() {

  $('.trigger-overlay, .trigger-contact-overlay, .trigger-email-capture').click(function() {
    event.preventDefault();
    return false;
  });

  //borrowed from jQuery easing plugin
  //http://gsgd.co.uk/sandbox/jquery.easing.php
  $.easing.easeInOutCubic = function(x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  };

  $('.home .arrow-scroll').click(function(event) {
    var scrollOffset = -57;
    createScroll($(this), scrollOffset, 750);
    event.preventDefault();
    return false
  });

  $('.activity-category-layout .arrow-scroll').click(function(event) {
    var scrollOffset = -37;
    createScroll($(this), scrollOffset, 750);
    event.preventDefault();
    return false
  });

  $('.cost-estimate a').click(function(event) {
    var scrollOffset = -57;
    createScroll($(this), scrollOffset, 750);
    event.preventDefault();
    return false
  })

  $('a.activity-link-jump').click(function(event){
    var target = $(this).attr('href');
    var slug = $(this).attr('data-slug');
    $('.activity-card').addClass('not-selected');
    $('#'+slug).removeClass('not-selected')
    setTimeout(function() {
      $('#'+slug).addClass('selected')
      setTimeout(function() {
        $('#'+slug).removeClass('selected');
        $('.activity-card').removeClass('not-selected');
      }, 1500);
    }, 1000);

    createScroll($(this), -60, 1000);


    event.preventDefault();
    return false
  })

});