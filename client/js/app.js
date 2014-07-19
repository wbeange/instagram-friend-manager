//self execution wrapper
$(function () {
  
  var User = Backbone.Model.extend({});
  var Users = Backbone.Collection.extend({ model: User });

  var AppView = Backbone.View.extend({

    el: $('body'),
 
    initialize: function()
    {
      
      // fixes loss of context for 'this' within methods
      _.bindAll(this, 'render'); 

       //this.render();
       this.get_follows();
    },
   
    render: function()
    {
      
      var template = $('#testemplate').html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, {name:"Luke"});
      $('#app').html(rendered);

    },

    get_follows: function()
    {
    	var url = "http://localhost/instagram-friends-manager/server/web/follows/"

    	$.getJSON(url, function(data){

        var template = $('#template-follows').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $('#app').html(rendered);

    	});
    },

  });
  
  var appView = new AppView();
});