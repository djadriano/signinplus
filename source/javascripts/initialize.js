//= require '_signin'

//= require_self

;(function( window ) {

  'use strict'

  window.gplus_onload_callback = function() {
    signin.initialize();
  }

  window.gplus_signin_button_callback = function( param ) {
    signin.button_callback( param );
  }

})( window );
