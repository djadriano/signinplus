//= require _templates/user_information
//= require _templates/user_friends
//= require _templates/user_pages
//= require _templates/user_search_people
//= require _templates/user_activities

FeedView = Backbone.View.extend({

  el : '.content',

  events : {
    'submit .form-search-people' : 'search_people'
  },

  user_information_template   : JST[ '_templates/user_information'   ],
  user_friends_template       : JST[ '_templates/user_friends'       ],
  user_pages_template         : JST[ '_templates/user_pages'         ],
  user_search_people_template : JST[ '_templates/user_search_people' ],
  user_activities_template    : JST[ '_templates/user_activities'    ],

  initialize : function() {

    _.bindAll( this, 'get_user_data', 'get_user_friends', 'search_people', 'show_feed_content', 'show_user_pages_follow' );

    this.model = new FeedModel();
    this.listenTo( this.model, 'change:user_id', this.show_feed_content );

    this.show_feed_content();

  },

  get_user_data : function() {

    var self            = this;
    var request_my_data = gapi.client.plus.people.get( { 'userId' : 'me' } );

    request_my_data.execute(function( profile ) {

      var data_to_template = {
        name        : profile.displayName,
        photo       : profile.image.url,
        city        : profile.placesLived[ 0 ].value,
        url_profile : profile.url
      };

      $( '.user-information' ).html( self.user_information_template( data_to_template ) );

      $( '.user-search-people-submit' ).on( 'click', self.search_people );

    });

  },

  get_user_friends : function() {

    var self    = this;
    var request = gapi.client.plus.people.list({
      'userId'     : 'me',
      'collection' : 'visible'
    });

    request.execute(function( resp ) {

      var data_to_template = resp.items;
      $( '.user-friends' ).append( self.user_friends_template( { data : data_to_template } ) );

      // show the pages that user follow in gplus
      self.show_user_pages_follow( data_to_template );

    });

  },

  get_user_activities : function() {

    var self    = this;
    var request = gapi.client.plus.activities.list({
      'userId' : 'me',
      'collection' : 'public'
    });

    request.execute(function(resp) {

      var data_to_template = resp.items;

      $( '.user-activities' ).html( self.user_activities_template( { data : data_to_template } ) );

    });

  },

  search_people : function( evt ) {

    evt.preventDefault();

    var search_field = $( '.user-search-people-field' ),
        self = this;

    var request = gapi.client.plus.people.search({
      'query' : search_field.val()
    });

    request.execute(function( resp ) {

      var data_to_template = resp.items;

      $( '.user-search-people-result' ).html( self.user_search_people_template( { data : data_to_template } ) );

    });

  },

  show_feed_content : function() {

    $( '.user' ).addClass( 'user-logged' );
    $( '.share' ).addClass( 'user-logged' );

    signin_view.hide_box_login();

    this.get_user_data();
    this.get_user_friends();
    this.get_user_activities();

  },

  show_user_pages_follow : function( data_to_template ) {
    $( '.user-pages' ).append( this.user_pages_template( { data : data_to_template } ) );
  }

});