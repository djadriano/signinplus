AppRoutes = Backbone.Router.extend({

  routes : {
    "!/user/:id": "user_feed"
  },

  user_feed : function( id ) {
    // window.feed_view ? window.feed_view = window.feed_view : new FeedView();
    // window.feed_view.model.set({ user_id : id });
  }

});