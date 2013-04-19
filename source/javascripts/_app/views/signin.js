//= require _app/models/feed
//= require _app/views/feed

SignInView = Backbone.View.extend({

  el : '.box_login',

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
      window.feed_view = new FeedView();
    }

  }

});