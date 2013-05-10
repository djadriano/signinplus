//= require _app/models/feed
//= require _app/views/feed

SignInView = Backbone.View.extend({

  el : '.box-login',

  initialize : function() {
    _.bindAll( this, 'show_box_login', 'hide_box_login' );
  },

  show_box_login : function() {
    this.$el.addClass( 'not-logged' );
  },

  hide_box_login : function() {
    this.$el.removeClass( 'not-logged' );
  },

  button_callback : function( param ) {

    if( param[ 'error' ] ) {
      this.show_box_login();
    }

    if( param[ 'access_token' ] ) {

      this.add_app_activity();

      window.routes ? window.routes = window.routes : window.routes = new AppRoutes( window );
      Backbone.history.start();
    }

  },

  add_app_activity : function() {

    var momentWithoutUrl = {
      'type' : 'http://schemas.google.com/AddActivity',
      'target' : {
        'id' : 'a-unique-id-1',
        'name' : 'Signin + Login Successfully',
        'description' : 'Yeah baby, Im login!',
        'image' : 'http://www.insidemobileapps.com/wp-content/uploads/2013/02/google-plus-app-icon.jpeg'
      }
    };

    var request = gapi.client.request({
      'path'   : 'plus/v1/people/me/moments/vault',
      'method' : 'POST',
      'body'   : JSON.stringify(momentWithoutUrl)
    });

    request.execute();

  }

});