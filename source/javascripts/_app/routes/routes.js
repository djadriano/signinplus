AppRoutes = Backbone.Router.extend({

  routes : {
    ""           : "feed",
    "!/user/:id" : "user_feed"
  },

  initialize : function() {
    window.feed_view ? window.feed_view = window.feed_view : window.feed_view = new FeedView();
  },

  feed : function() {
    window.feed_view.model.set({ userId : 'me' });
  },

  user_feed : function( id ) {
    window.feed_view.model.set({ userId : id });
  }

});