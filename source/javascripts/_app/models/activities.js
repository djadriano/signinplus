ActivitiesModel = Backbone.Model.extend({

  defaults : {
    content : {}
  },

  add : function() {

    var self = this;

    var request = gapi.client.request({
      'path'   : 'plus/v1/people/me/moments/vault',
      'method' : 'POST',
      'body'   : JSON.stringify( self.get( 'content' ) )
    });

    request.execute(function(param) {
      console.log(param);
    });

  }

});