//= require _libraries/jquery-1.9.1.min
//= require _libraries/lodash
//= require _libraries/json2
//= require _libraries/backbone-min

//= require _app/models/activities
//= require _app/views/signin
//= require _app/routes/routes

//= require_self

;(function( window ) {

  'use strict'

  window.gplus_onload_callback = function() {

    // load the gplus javascript sdk
    gapi.client.load('plus', 'v1', function() {

      // render the sign in button
      gapi.signin.render('signin-button', {
        'callback'              : 'gplus_signin_button_callback',
        'clientid'              : '850481970795.apps.googleusercontent.com',
        'cookiepolicy'          : 'single_host_origin',
        'requestvisibleactions' : 'http://schemas.google.com/AddActivity',
        'scope'                 : 'https://www.googleapis.com/auth/plus.login'
      });

      window.app_activities = new ActivitiesModel();
      window.signin_view    = new SignInView();

    });

  }

  window.gplus_signin_button_callback = function( param ) {
    signin_view.button_callback( param );
  }

})( window );