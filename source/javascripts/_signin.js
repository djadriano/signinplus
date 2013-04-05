//= require _templates/user_information
//= require _templates/user_friends
//= require _templates/user_pages
//= require _templates/user_search_people

var signin = (function() {

  'use strict'

  // -----------------------------------
  // private methods and variables
  // -----------------------------------

  var user_information_template   = JST[ '_templates/user_information'   ];
  var user_friends_template       = JST[ '_templates/user_friends'       ];
  var user_pages_template         = JST[ '_templates/user_pages'         ];
  var user_search_people_template = JST[ '_templates/user_search_people' ];

  var register_events = function() {
    $( '.user-search-people-submit' ).on( 'click', search_friends );
  };

  var show_box_login = function() {
    $( '.box-login' ).addClass( 'not-logged' );
  };

  var get_my_data = function() {

    var request_my_data = gapi.client.plus.people.get( { 'userId' : 'me' } );

    request_my_data.execute(function( profile ) {

      var data_to_template = {
        name        : profile.displayName,
        photo       : profile.image.url,
        city        : profile.placesLived[ 0 ].value,
        url_profile : profile.url
      };

      $( '.user-information' ).html( user_information_template( data_to_template ) );

    });

  };

  var search_friends = function( evt ) {

    var search_field = $( '.user-search-people-field' );

    var request = gapi.client.plus.people.search({
      'query' : search_field.val()
    });

    request.execute(function( resp ) {

      var data_to_template = resp.items;

      $( '.user-search-people-result' ).html( user_search_people_template( { data : data_to_template } ) );

    });

  }

  var show_user_pages_follow = function( data_to_template ) {
    $( '.user-pages' ).append( user_pages_template( { data : data_to_template } ) );
  };

  var get_my_friends = function() {

    var request = gapi.client.plus.people.list({
      'userId'     : 'me',
      'collection' : 'visible'
    });

    request.execute(function( resp ) {

      var data_to_template = resp.items;
      $( '.user-friends' ).append( user_friends_template( { data : data_to_template } ) );

      // show the pages that user follow in gplus
      show_user_pages_follow( data_to_template );

    });

  };

  var show_user_content = function() {

    $( '.user' ).addClass( 'user-logged' );
    $( '.box-login' ).removeClass( 'not-logged' );

    get_my_data();
    get_my_friends();

  };

  // -------------------------
  // public methods
  // -------------------------

  return {

    initialize : function() {

      // register events
      register_events();

      // load the gplus javascript sdk
      gapi.client.load('plus', 'v1', function() {

        // render the sign in button
        gapi.signin.render('signin-button', {
          'callback'              : 'gplus_signin_button_callback',
          'clientid'              : '850481970795.apps.googleusercontent.com',
          'cookiepolicy'          : 'single_host_origin',
          'requestvisibleactions' : 'http://schemas.google.com/AddActivity',
          'apppackagename'        : 'com.google.plus',
          'scope'                 : 'https://www.googleapis.com/auth/plus.login'
        });

      });

    },

    button_callback : function( param ) {

      if( param[ 'error' ] ) {
        show_box_login();
      }

      if( param[ 'access_token' ] ) {
        show_user_content();
      }

    }

  }

})();