//= require _app/views/search
//= require _app/views/friends

//= require _templates/user_information
//= require _templates/user_activities

FeedView = Backbone.View.extend({

  el : '.content',

  events : {
    'submit .form-search-people' : 'search_people'
  },

  user_information_template  : JST[ '_templates/user_information' ],
  user_activities_template   : JST[ '_templates/user_activities'  ],

  initialize : function() {

    _.bindAll( this, 'get_user_data', 'get_user_friends', 'search_people', 'show_feed_content' );

    this.model = new FeedModel();

    this.listenTo( this.model, 'change:userId', this.show_feed_content );

  },

  get_user_data : function() {

    var self            = this;
    var request_my_data = gapi.client.plus.people.get( { 'userId' : this.model.get( 'userId' ) } );

    request_my_data.execute(function( profile ) {

      var data_to_template = {
        name        : profile.displayName,
        photo       : profile.image.url,
        city        : '',
        url_profile : ''
      };

      $( '.user-information' ).html( self.user_information_template( data_to_template ) );

      $( '.user-search-people-submit' ).on( 'click', self.search_people );

    });

  },

  get_user_friends : function() {

    window.friends_view ? window.friends_view = window.friends_view : window.friends_view = new FriendsView();

    friends_view.model.set({ userId : this.model.get( 'userId' ) });

  },

  get_user_activities : function() {

    var self    = this;
    var request = gapi.client.plus.activities.list({
      'userId'     : this.model.get( 'userId' ),
      'collection' : 'public'
    });

    request.execute(function(resp) {

      if( resp.hasOwnProperty( 'items' ) ) {

        var data_to_template = resp.items;

        $( '.user-activities' ).html( self.user_activities_template( { data : data_to_template } ) );

      }

    });

  },

  search_people : function( evt ) {

    evt.preventDefault();

    var search_field = this.$el.find( '.user-search-people-field' );

    window.search_view ? window.search_view = window.search_view : window.search_view = new SearchView();

    if( search_field.val() !== '' ) {
      search_view.model.set({ search_value : search_field.val() });
    }

  },

  show_feed_content : function() {

    this.$el.find( '.user' ).addClass( 'user-logged' );
    this.$el.find( '.share' ).addClass( 'user-logged' );

    window.signin_view.hide_box_login();

    this.get_user_data();
    this.get_user_friends();
    this.get_user_activities();

  }

});