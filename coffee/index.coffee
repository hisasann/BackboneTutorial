$ ->
  # chapter1
  # Events sample
  do () ->
    chapter = '1'
    ClickView = Backbone.View.extend
      el: '#hoge'
      events:
        'click': 'click'
        'click .bar': 'clickBar'
      click: (e) ->
        console.log "#{chapter} - click"
      clickBar: (e) ->
        console.log "#{chapter} - clickBar"

    new ClickView()


  # chapter2
  # render sample
  do () ->
    chapter = '2'
    UserView = Backbone.View.extend
      templete: $('#index-template').html()
      el: '#user'
      initialize: () ->
        @render()
      render: () ->
        info =
          name: "#{chapter} - hisasann"
          title: "#{chapter} - hoge"
        $(@el).html Mustache.render @templete,  info

    new UserView()

  # chapter3
  # Model sample
  do () ->
    chapter = '3'
    UserModel = Backbone.Model.extend
      initialize: (attrs, options) ->
        @log()
      log: () ->
        console.log "#{chapter} - ", @get 'name'
      validate: (attrs) ->
        # set, saveでfire
        if attrs.name.length isnt 0
          console.log "#{chapter} - nameはnilじゃない"

    attrs =
      name: 'hisasann'
    options =
      title: 'hoge'
    userModel = new UserModel attrs, options

    console.log "#{chapter} - ", userModel.has 'name'  # true
    console.log "#{chapter} - ", userModel.get 'name'  # hisasann
    console.log "#{chapter} - ", userModel.set name: 'yoshiyuki'
    # optionsにセットした値はgetできない
    console.log "#{chapter} - ", userModel.has 'title' # false
    console.log "#{chapter} - ", userModel.get 'title' # undefined


  # chapter4
  # View sample
  do () ->
    chapter = '4'
    BlogView = Backbone.View.extend
      templete: $('#blog-template').html()
      events:
        "click .likeBtn": 'countUp'
      initialize: (options) ->
        _.bindAll @, 'render'
        @model.bind 'change', @render
        @render()
      render: () ->
        $(@el).html Mustache.render @templete, @model.attributes
      countUp: (event) ->
        event.preventDefault()

        @model.set
          like: @model.get('like') + 1

    Blog = Backbone.Model.extend
      initialize: (attrs, options) ->

    blog = new Blog
      text: 'foo'
      like: 0

    blogView = new BlogView
      el: $('#blog')
      model: blog


  # chapter5
  # Router sample
  do () ->
    chapter = '5'
    # routesに''がないとブラウザバックしたときにcallbackが呼ばれない
    # さらにRouterのroutesは画面内で共有されるっぽい
    Router = Backbone.Router.extend
      routes:
        '': 'root'
        'foo/:hoge': 'foo'
      root: () ->
        console.log "#{chapter} - root"
      foo: (hoge) ->
        console.log "#{chapter} - #{hoge}"

    router = new Router()

    $('a[href^=#]').bind 'click', (e) ->
      if not $(@).hasClass 'pushstate'
        return

      # 第二引数でURL書き換えと同時にcallback関数を実行
      router.navigate $(@).attr('href').substr(1), true
      e.preventDefault()


  # chapter6
  # Router sample
  do () ->
    chapter = '6'
    EntryModel = Backbone.Model.extend
      defaults:
        title: ''
        content: ''
      initialize: (attrs, options) ->
    entryModel = new EntryModel

    EntryView = Backbone.View.extend
      templete: $('#entry-template').html()
      events:
        'click #showEntry': 'showEntry'
      render: () ->
        $(@el).html Mustache.render @templete, @model.attributes
      showEntry: (event) ->
        event.preventDefault()

        entryRouter.navigate 'entry/hoge', true

    entryView = new EntryView
      el: $('#entry')
      model: entryModel

    EntryRouter = Backbone.Router.extend
      routes:
        'entry/hoge': 'showEntry'
      showEntry: () ->
        $.getJSON 'http://127.0.0.1:8124', null, (data, status) ->
          entryModel.set
            'title': data.title
          entryModel.set
            'content': data.content
          entryView.render()

    entryRouter = new EntryRouter()



    # history.start
    Backbone.history.start
      pushState: true
      root: '/~hisamatsu/backbone/'

