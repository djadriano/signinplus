//= require _app/models/feed
//= require _app/views/feed

SignInView = Backbone.View.extend({

  el : '.box-login',

  initialize : function() {
    _.bindAll( this, 'show_box_login', 'hide_box_login', 'add_login_activity' );
  },

  show_box_login : function() {
    this.$el.addClass( 'not-logged' );
  },

  hide_box_login : function() {
    this.$el.removeClass( 'not-logged' );
  },

  add_login_activity : function() {

    var momentWithoutUrl = {
      'type'   : 'http://schemas.google.com/AddActivity',
      'target' : {
        'id'          : 'app-login',
        'name'        : 'Signin + Login',
        'description' : 'The user made successful login in the app',
        'image'       : 'https://developers.google.com/+/web/snippet/examples/thing.png'
      }
    };

    var request = gapi.client.request({
      'path'   : 'plus/v1/people/me/moments/vault',
      'method' : 'POST',
      'body'   : JSON.stringify(momentWithoutUrl)
    });

    request.execute();

  },

  button_callback : function( param ) {

    if( param[ 'error' ] ) {
      this.show_box_login();
    }

    if( param[ 'access_token' ] ) {
      window.feed_view = new FeedView();
      this.add_login_activity();
    }

  }

});