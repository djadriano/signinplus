//= require _app/models/user_activities
//= require _templates/user_activities

UserActivitiesView = Backbone.View.extend({

  el : '.user-activities',

  user_activities_template : JST[ '_templates/user_activities'  ],

  initialize : function() {

    this.model = new UserActivitiesModel();
    this.listenTo( this.model, 'change:userId', this.render );

  },

  render : function() {

    var self    = this;
    var request = gapi.client.plus.activities.list({
      'userId'     : this.model.get( 'userId' ),
      'collection' : 'public'
    });

    request.execute(function(resp) {

      if( resp.hasOwnProperty( 'items' ) ) {
        var data_to_template = resp.items;
      } else {
        var data_to_template = '';
      }

      self.$el.html( self.user_activities_template( { data : data_to_template } ) );

    });

  }

});