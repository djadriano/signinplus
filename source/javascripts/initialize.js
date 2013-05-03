//= require _libraries/jquery-1.9.1.min
//= require _libraries/lodash
//= require _libraries/json2
//= require _libraries/backbone-min

//= require _app/views/signin

//= require_self

;(function( window ) {

  'use strict'

  window.gplus_onload_callback = function() {

    console.log('gplus_onload_callback');

    // load the gplus javascript sdk
    gapi.client.load('plus', 'v1', function() {

      console.log('gapi loaded');

      // render the sign in button
      gapi.signin.render('signin-button', {
        'callback'              : 'gplus_signin_button_callback',
        'clientid'              : '850481970795.apps.googleusercontent.com',
        'cookiepolicy'          : 'single_host_origin',
        'requestvisibleactions' : 'http://schemas.google.com/AddActivity',
        'scope'                 : 'https://www.googleapis.com/auth/plus.login'
      });

      window.signin_view = new SignInView();

    });


  }

  window.gplus_signin_button_callback = function( param ) {

    // new AppRoutes();
    // Backbone.history.start();

    window.signin_view.button_callback( param );
  }

})( window );
