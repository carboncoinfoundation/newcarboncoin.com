(function() {
  var triggerBttns = document.getElementsByClassName( 'trigger-overlay' )
    breadcrumbBttn = document.getElementById( 'breadcrumb-activities'),
    overlay = document.querySelector( 'div.overlay-navigation' ),
    body = document.querySelector('body'),
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if (classie.has( body, 'overlay-closed')) {
      classie.remove( body, 'overlay-closed');
      classie.add (body, 'overlay-open');
      classie.add (body, 'an-overlay-open');
      for (var i=0; i<triggerBttns.length; i++) {
        classie.add( triggerBttns[i], 'open' );
        classie.remove( triggerBttns[i], 'closed' );
      }
    } else {
      classie.add( body, 'overlay-closed');
      classie.remove ( body, 'overlay-open');
      for (var i=0; i<triggerBttns.length; i++) {
        classie.add( triggerBttns[i], 'closed' );
        classie.remove( triggerBttns[i], 'open' );
      }
    }
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.remove (body, 'an-overlay-open');
      classie.add( overlay, 'shut' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'shut' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'shut' ) ) {
      classie.add( overlay, 'open' );
    }
  }
  if (breadcrumbBttn != null) {
    breadcrumbBttn.addEventListener( 'click', toggleOverlay );
  }
  for (var i=0; i<triggerBttns.length; i++) {
    triggerBttns[i].addEventListener( 'click' , toggleOverlay );
  }
})();
