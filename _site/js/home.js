$(function() {

  $(window).scroll(function(e){
    var scrolled = $(window).scrollTop();
    var percent = scrolled * 0.09;
    percent = 50 - percent;
    $('header.banner').css('background-position', '50% '+ percent +'%');
  });

});
