//= require _app/views/search
//= require _app/views/user_activities
//= require _app/views/friends

//= require _templates/user_information

FeedView = Backbone.View.extend({

  el : '.content',

  events : {
    'submit .form-search-people' : 'search_people'
  },

  template : JST[ '_templates/user_information' ],

  initialize : function() {

    _.bindAll( this, 'get_user_data', 'get_user_friends', 'search_people', 'show_feed_content' );

    // initialize views of feed modules
    window.friends_view         = new FriendsView();
    window.user_activities_view = new UserActivitiesView();
    window.search_view          = new SearchView();

    this.model = new FeedModel();

    this.listenTo( this.model, 'change:userId', this.show_feed_content );

  },

  get_user_data : function() {

    var self            = this;
    var request_my_data = gapi.client.plus.people.get({ 'userId' : this.model.get( 'userId' ) });

    request_my_data.execute(function( profile ) {

      var data_to_template = {
        name        : profile.displayName,
        photo       : profile.image.url,
        city        : profile.hasOwnProperty( 'placesLived' ) ? profile.placesLived[ 0 ].value : '',
        url_profile : profile.url
      };

      self.$el.find( '.user-information' ).html( self.template( data_to_template ) );

      self.$el.find( '.user-search-people-submit' ).on( 'click', self.search_people );

      // add app moments (activities)
      app_activities.set({
        content : {
          'type'   : 'http://schemas.google.com/AddActivity',
          'target' : {
            'id'          : 'a-unique-id-1',
            'name'        : 'I see the ' + profile.displayName + ' profile',
            'description' : 'Hello!',
            'image'       : 'http://www.insidemobileapps.com/wp-content/uploads/2013/02/google-plus-app-icon.jpeg'
          }
        }
      });

      app_activities.add();

      var request_moments = gapi.client.plus.moments.list({
        'userId'     : 'me',
        'collection' : 'vault'
      });

      request_moments.execute(function(resp) {
        console.log(resp.items.length);
      });

    });

  },

  get_user_friends : function() {
    friends_view.model.set({ userId : this.model.get( 'userId' ) });
  },

  get_user_activities : function() {
    user_activities_view.model.set({ userId : this.model.get( 'userId' ) });
  },

  search_people : function( evt ) {

    evt.preventDefault();

    var search_field = this.$el.find( '.user-search-people-field' );

    if( search_field.val() !== '' ) {

      // add app moments (activities)
      app_activities.set({
        content : {
          'type'   : 'http://schemas.google.com/AddActivity',
          'target' : {
            'id'          : 'a-unique-id-1',
            'name'        : 'I made search for: ' + search_field.val(),
            'description' : 'Yeah baby, Im search!',
            'image'       : 'http://www.insidemobileapps.com/wp-content/uploads/2013/02/google-plus-app-icon.jpeg'
          }
        }
      });

      app_activities.add();

      routes.navigate( "!/search/" + search_field.val(), { trigger: true } );

    }

  },

  show_feed_content : function() {

    this.$el.find( '.user' ).addClass( 'user-logged' );
    this.$el.find( '.share' ).addClass( 'user-logged' );

    signin_view.hide_box_login();
    search_view.hide_results();

    this.get_user_data();
    this.get_user_friends();
    this.get_user_activities();

  }

});