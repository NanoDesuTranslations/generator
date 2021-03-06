<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>Nanodesu</title>

  <!-- Bootstrap -->
  <link href="{{rootPath}}static/bootstrap.min.css" rel="stylesheet">
  <link href="{{rootPath}}static/bootstrap-submenu-2.0.1-dist/css/bootstrap-submenu.min.css" rel="stylesheet">
  <link href="{{rootPath}}static/site.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body>
  <nav class="navbar navbar-default box">
    <div class="container header-image">
      <a href="{{rootPath}}{{series.url}}">
        <img class="img-responsive" border="0" alt="" src="{{series.config.header-url}}" />
      </a>
    </div>
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
       </div>

       <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav centered">
          {{#*inline "hb-dropdown"}}
            {{#each items}}
              {{#if items}}
                <li class="dropdown-submenu">
                  <a href="javascript:void(0)">
                    {{#if path}}
                    <span onclick="window.location = '{{@root.rootPath}}{{path}}'" style="z-index:2;padding:0 3px;">•</span>
                    {{/if}}
                    {{label}}
                  </a>
                  <ul class="dropdown-menu">
                    {{> hb-dropdown}}
                  </ul>
                </li>
              {{else}}
                {{#if path}}
                  <li><a href="{{@root.rootPath}}{{path}}">{{label}}</a></li>
                {{else}}
                  <li><a href="javascript:void(0)">{{label}}</a></li>
                {{/if}}
              {{/if}}
            {{/each}}
          {{/inline}}
          
          {{#each series.navigation}}
            {{#if items}}
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span>{{label}}</span>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" data-submenu>
                  {{> hb-dropdown}}
                </ul>
              </li>
            {{else}}
              {{#if path}}
                <li><a href="{{@root.rootPath}}{{path}}">{{label}}</a></li>
              {{else}}
                <li><a href="#">{{label}}</a></li>
              {{/if}}
            {{/if}}
          {{/each}}
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>

  <div class="container content-container">
    <div class="row">
      <div class="col-md-9 col-xs-12 colpad-right">
        <div class="panel panel-default box">
          <div class="panel-heading">
            <h4>{{#if title}}{{title}}{{else}}{{series.name}}{{/if}} <a href="{{rootPath}}{{parent_path}}">⇖</a></h4>
          </div>
          <div class="panel-body">

            <!-- content start -->
            {{{contents}}}
            <!-- content end -->
          </div>
        </div>
        <div id="disqus_thread"></div>
      </div>
      <div class="col-md-3 hidden-xs hidden-sm colpad-left">
        <div class="panel panel-default box">
          <div class="panel-body">
            <h6>NanoDesu Translations Home</h6>
            <hr>
            <p>
              <a href="http://www.nanodesutranslations.wordpress.com">
                <img class="img-responsive" border="0" alt="" src="http://nanodesutranslations.files.wordpress.com/2014/05/h6wvikg.png" />
              </a>
            </p>
            {{#if enabled.twitter}}
              <div id="twitter_container">
                <a class="twitter-timeline" data-height="425" data-dnt="true" data-theme="dark" href="https://twitter.com/Nano_Desu_Yo">Tweets by Nano_Desu_Yo</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>
            {{/if}}
            {{#if enabled.facebook}}
              <div id="fb-root"></div>
              <script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
              fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));</script>
              <div class="fb-page" data-href="https://www.facebook.com/NanodesuTranslations" data-tabs="timeline" data-height="130" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/NanodesuTranslations" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/NanodesuTranslations">NanoDesu Translations</a></blockquote></div>
            {{/if}}
            <div class="textwidget" style="margin-top:10px;color:#888888;">
              <p>The work translated on this website is the legal property of its original copyright holder. It is translated here without monetary incentive solely for the purposes of promoting domestic interest in the work and improving personal language proficiency.</p>
              <p>Any or all content of this website will be deleted upon the establishment of an official license for translation of this work into English or upon request by any of the original copyright holders for this work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script type="text/javaScript" src="{{rootPath}}static/bootstrap-submenu-2.0.1-dist/js/bootstrap-submenu.min.js"></script>
    <script type="text/javascript">
      $('[data-submenu]').submenupicker();
    </script>
    
    {{#if enabled.disqus }}
    <script>
      var disqus_config = function () {
          this.page.url = {{full_path}};  // Replace PAGE_URL with your page's canonical URL variable
          //this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = '//nanodesu.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
      })();
    </script>
    {{/if}}
    {{#if enabled.google_analytics }}
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-83157618-1', 'auto');
      ga('send', 'pageview');

    </script>
    {{/if}}
  </body>
</html>
