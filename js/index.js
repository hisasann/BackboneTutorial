// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    (function() {
      var ClickView, chapter;
      chapter = '1';
      ClickView = Backbone.View.extend({
        el: '#hoge',
        events: {
          'click': 'click',
          'click .bar': 'clickBar'
        },
        click: function(e) {
          return console.log("" + chapter + " - click");
        },
        clickBar: function(e) {
          return console.log("" + chapter + " - clickBar");
        }
      });
      return new ClickView();
    })();
    (function() {
      var UserView, chapter;
      chapter = '2';
      UserView = Backbone.View.extend({
        templete: $('#index-template').html(),
        el: '#user',
        initialize: function() {
          return this.render();
        },
        render: function() {
          var info;
          info = {
            name: "" + chapter + " - hisasann",
            title: "" + chapter + " - hoge"
          };
          return $(this.el).html(Mustache.render(this.templete, info));
        }
      });
      return new UserView();
    })();
    (function() {
      var UserModel, attrs, chapter, options, userModel;
      chapter = '3';
      UserModel = Backbone.Model.extend({
        initialize: function(attrs, options) {
          return this.log();
        },
        log: function() {
          return console.log("" + chapter + " - ", this.get('name'));
        },
        validate: function(attrs) {
          if (attrs.name.length !== 0) {
            return console.log("" + chapter + " - nameはnilじゃない");
          }
        }
      });
      attrs = {
        name: 'hisasann'
      };
      options = {
        title: 'hoge'
      };
      userModel = new UserModel(attrs, options);
      console.log("" + chapter + " - ", userModel.has('name'));
      console.log("" + chapter + " - ", userModel.get('name'));
      console.log("" + chapter + " - ", userModel.set({
        name: 'yoshiyuki'
      }));
      console.log("" + chapter + " - ", userModel.has('title'));
      return console.log("" + chapter + " - ", userModel.get('title'));
    })();
    (function() {
      var Blog, BlogView, blog, blogView, chapter;
      chapter = '4';
      BlogView = Backbone.View.extend({
        templete: $('#blog-template').html(),
        events: {
          "click .likeBtn": 'countUp'
        },
        initialize: function(options) {
          _.bindAll(this, 'render');
          this.model.bind('change', this.render);
          return this.render();
        },
        render: function() {
          return $(this.el).html(Mustache.render(this.templete, this.model.attributes));
        },
        countUp: function(event) {
          event.preventDefault();
          return this.model.set({
            like: this.model.get('like') + 1
          });
        }
      });
      Blog = Backbone.Model.extend({
        initialize: function(attrs, options) {}
      });
      blog = new Blog({
        text: 'foo',
        like: 0
      });
      return blogView = new BlogView({
        el: $('#blog'),
        model: blog
      });
    })();
    (function() {
      var Router, chapter, router;
      chapter = '5';
      Router = Backbone.Router.extend({
        routes: {
          '': 'root',
          'foo/:hoge': 'foo'
        },
        root: function() {
          return console.log("" + chapter + " - root");
        },
        foo: function(hoge) {
          return console.log("" + chapter + " - " + hoge);
        }
      });
      router = new Router();
      return $('a[href^=#]').bind('click', function(e) {
        if (!$(this).hasClass('pushstate')) {
          return;
        }
        router.navigate($(this).attr('href').substr(1), true);
        return e.preventDefault();
      });
    })();
    return (function() {
      var EntryModel, EntryRouter, EntryView, chapter, entryModel, entryRouter, entryView;
      chapter = '6';
      EntryModel = Backbone.Model.extend({
        defaults: {
          title: '',
          content: ''
        },
        initialize: function(attrs, options) {}
      });
      entryModel = new EntryModel;
      EntryView = Backbone.View.extend({
        templete: $('#entry-template').html(),
        events: {
          'click #showEntry': 'showEntry'
        },
        render: function() {
          return $(this.el).html(Mustache.render(this.templete, this.model.attributes));
        },
        showEntry: function(event) {
          event.preventDefault();
          return entryRouter.navigate('entry/hoge', true);
        }
      });
      entryView = new EntryView({
        el: $('#entry'),
        model: entryModel
      });
      EntryRouter = Backbone.Router.extend({
        routes: {
          'entry/hoge': 'showEntry'
        },
        showEntry: function() {
          return $.getJSON('http://127.0.0.1:8124', null, function(data, status) {
            entryModel.set({
              'title': data.title
            });
            entryModel.set({
              'content': data.content
            });
            return entryView.render();
          });
        }
      });
      entryRouter = new EntryRouter();
      return Backbone.history.start({
        pushState: true,
        root: '/~hisamatsu/backbone/'
      });
    })();
  });

}).call(this);
