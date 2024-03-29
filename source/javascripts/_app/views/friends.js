//= require _app/models/friends
//= require _templates/user_friends
//= require _templates/user_pages

FriendsView = Backbone.View.extend({

  el : '.user-friends',

  user_friends_template : JST[ '_templates/user_friends' ],
  user_pages_template   : JST[ '_templates/user_pages'   ],

  initialize : function() {

    _.bindAll( this, 'render', 'show_user_pages_follow' );

    this.model = new FriendsModel();
    this.listenTo( this.model, 'change:userId', this.render );

  },

  render : function() {

    var self    = this;
    var request = gapi.client.plus.people.list({
      'userId'     : this.model.get( 'userId' ),
      'collection' : 'visible'
    });

    request.execute(function( resp ) {

      var data_to_template = resp.items;

      if( !resp.hasOwnProperty( 'code' ) ) {

        self.$el.html( self.user_friends_template( { data : data_to_template } ) ).removeClass( 'hide-section' );
        self.show_user_pages_follow( data_to_template );

      } else {

        self.$el.addClass( 'hide-section' );
        $( '.user-pages' ).addClass( 'hide-section' );

      }

    });

  },

  show_user_pages_follow : function( data_to_template ) {
    $( '.user-pages' ).html( this.user_pages_template( { data : data_to_template } ) ).removeClass( 'hide-section' );
  }

});