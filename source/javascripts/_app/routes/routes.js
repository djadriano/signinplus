AppRoutes = Backbone.Router.extend({

  routes : {
    ""                : "feed",
    "!/user/:id"      : "user_feed",
    "!/search/:value" : "search"
  },

  initialize : function() {
    window.feed_view ? window.feed_view = window.feed_view : window.feed_view = new FeedView();
  },

  feed : function() {
    feed_view.model.set({ userId : 'me' });
    search_view.model.clear();
  },

  user_feed : function( id ) {
    feed_view.model.set({ userId : id });
  },

  search : function( value ) {

    // if is the first time that user access page, call the feed method
    if( !feed_view.model.get( 'userId' ) || feed_view.model.get( 'userId' ) !== 'me' ) {
      this.feed();
    }

    // check if search parameter is equal the model attribute search value
    if( value === search_view.model.get( 'search_value' ) ) {
      search_view.show_results();
    } else {
      search_view.model.set({ search_value : value });
    }

  }

});