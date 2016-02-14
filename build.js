var Metalsmith = require("metalsmith");
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var rootpath = require('metalsmith-rootpath');
var each = require('metalsmith-each');
var branch = require('metalsmith-branch');

var multimatch = require('multimatch');
var jade = require('metalsmith-jade');

var copy = require('metalsmith-copy');

var config = require('config');
var loader = require('./loader/loader.js');

ms = Metalsmith(__dirname);

ms.use(loader());

ms.use(branch(["**/*.jpg", "**/*.png"])
  .use(copy({
    pattern:"**",
    directory:"./assets",
  }))
);

ms.use(markdown({
  smartypants: true,
  gfm: true,
  //tables: true
}));

var remote = function(filename, props, i){return props.series;};

ms.use(
  branch(remote)
    .use(rootpath())
    .use(each(function(file, filename){
      var data = file.contents.toString();
      data = data.replace("{{root}}", file.rootPath);
      data = data.replace("{{asset}}", file.rootPath+"assets/");
      file.contents = new Buffer(data);
    }))
    .use(layouts({
      engine:'handlebars',
      directory:'layouts',
      //partials:'layouts/partials',
      default: 'chapter.hb'
    }))
);

ms.use(
  branch('**/*.jade')
    .use(jade({
      //pretty: false,
      useMetadata: true,
    }))
);

if (config.get('autobuild')){
  var watch = require('metalsmith-watch');
  ms.use(
    watch({
      paths: {
        "${source}/**/*": '**',
        "layouts/**/*": '**',
      },
      livereload: true,
    })
  );
}
ms.destination(config.get('destination'));
ms.build(function(err) {
  if (err) throw err;
});
