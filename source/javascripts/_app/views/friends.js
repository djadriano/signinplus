//= require _templates/user_friends

FriendsView = Backbone.View.extend({

  el : '.user-friends',

  user_friends_template : JST[ '_templates/user_friends' ],

  initialize : function( userId ) {
    this.user_id = userId;
  },

  render : function() {

    var self = this;

    var request = gapi.client.plus.people.list({
      'userId'     : this.user_id,
      'collection' : 'visible'
    });

    request.execute(function( resp ) {

      if( !resp.hasOwnProperty( 'code' ) ) {

        var data_to_template = resp.items;
        this.$el.html( self.user_friends_template( { data : data_to_template } ) );

        // show the pages that user follow in gplus
        self.show_user_pages_follow( data_to_template );

      } else {
        $( '.user-friends' ).html( '' );
      }

    });

  }

});