//self execution wrapper
$(function () {
  
  var User = Backbone.Model.extend({});
  var Users = Backbone.Collection.extend({ model: User });

  var AppView = Backbone.View.extend({

    follows       : null,
    followed_by   : null,

    el: $('body'),
 
    events: {
      'click #menu_follows'       : 'event_follows',
      'click #menu_followed_by'   : 'event_followed_by',
    },

    initialize: function()
    {
      
      // fixes loss of context for 'this' within methods
      _.bindAll(this, 'render', 'event_follows', 'event_followed_by', 'get_follows', 'get_followed_by', 'server_get_follows', 'server_get_followed_by');

       //this.render();
       this.get_follows();
    },
   
    render: function()
    {
      
    },

    event_follows: function()
    {
      this.get_follows();
      return false;
    },

    event_followed_by: function()
    {
      this.get_followed_by();
      return false;
    },

    get_follows: function()
    {
      if(this.follows === null)
      {
        this.server_get_follows();
      }
      else
      {
        this.display_users( this.follows.toJSON() );
      }
    },

    get_followed_by: function()
    {
      if(this.followed_by === null)
      {
        this.server_get_followed_by();
      }
      else
      {
        this.display_users( this.followed_by.toJSON() );
      }
    },

    server_get_follows: function()
    {
    	var url = "http://localhost/instagram-friends-manager/server/web/follows/";

    	var that = this;
      $.getJSON(url, function(data){

        if(data.meta.code && data.meta.code == 200)
        {
          //add users to collection
          that.follows = new Users();
          for(var i in data.data)
          {
            that.follows.add(data.data[i]);
          }

          that.display_users( that.follows.toJSON() );
        }
        else
        {
          //todo error handling
        }
    	});
    },

    server_get_followed_by: function()
    {
      var url = "http://localhost/instagram-friends-manager/server/web/followed-by/";

      var that = this;
      $.getJSON(url, function(data){

        if(data.meta.code && data.meta.code == 200)
        {
          //add users to collection
          that.followed_by = new Users();
          for(var i in data.data)
          {
            that.followed_by.add(data.data[i]);
          }

          that.display_users( that.followed_by.toJSON() );
        }
        else
        {
          //todo error handling
        }
      });
    },    

    display_users: function(data)
    {
      var template = $('#template-follows').html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, {data:data});
      $('#app').html(rendered);
    },

  });
  
  var appView = new AppView();
});