var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

// The following utility function accepts a function as input and returns a new function. If the returned function is called before the timeout period (the default timeout is one second), it clears the timeout and invokes the input function. If the returned function isn't called before the timeout period, the input function is called regardless.


function createFunctionWithTimeout(callback, opt_timeout) {
  var called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, opt_timeout || 1000);
  return fn;
}

// Now you can easily wrap all hitCallback functions with a timeout to ensure your site works as expected even in cases where your hits fail to send or the analytics.js library never loads.

//        // Gets a reference to the form element, assuming
//        // it contains the id attribute "signup-form".
//        var form = document.getElementById('signup-form');
//
//        // Adds a listener for the "submit" event.
//        form.addEventListener('submit', function(event) {
//
//          // Prevents the browser from submiting the form
//          // and thus unloading the current page.
//          event.preventDefault();
//
//          // Sends the event to Google Analytics and
//          // resubmits the form once the hit is done.
//          ga('send', 'event', 'Signup Form', 'submit', {
//            hitCallback: createFunctionWithTimeout(function() {
//              form.submit();
//            })
//          });
//        });

$(function() {

  // Detect Social Clicks
  $('.social a').click(function(event) {
    event.preventDefault();
    var socialMedia = $(this).parent('li').attr('class');
    var socialMediaUrl = $(this).attr('href');

    ga('send', 'event', 'Social Media', 'visit', socialMedia, {
      hitCallback: createFunctionWithTimeout(function() {
        window.location = socialMediaUrl;
      })
    });
  })

});
