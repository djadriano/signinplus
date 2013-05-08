//= require _app/models/search
//= require _templates/user_search_people

SearchView = Backbone.View.extend({

  el : '.user-search-people-result',

  user_search_people_template : JST[ '_templates/user_search_people' ],

  initialize : function() {

    this.model = new SearchModel();
    this.listenTo( this.model, 'change:search_value', this.show_results );

  },

  show_results : function() {

    var self    = this;
    var request = gapi.client.plus.people.search({
      'query' : this.model.get( 'search_value' )
    });

    request.execute(function( resp ) {

      var data_to_template = resp.items;

      self.$el.html( self.user_search_people_template( { data : data_to_template } ) ).addClass( 'show-section' );

    });

  },

  hide_results : function() {
    this.$el.removeClass( 'show-section' );
  }

});