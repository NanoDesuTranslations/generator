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

var remote = function(filename, props, i){return props.series;};

var replaceall = function (replaceThis, withThis, inThis) {
  withThis = withThis.replace(/\$/g,"$$$$");
  return inThis.replace(new RegExp(replaceThis.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&])/g,"\\$&"),"g"), withThis);
};

conf_root_path = config.get("root_path");
var rootpath_shim = false;
if(conf_root_path === false){
  rootpath_shim = rootpath();
}else{
  rootpath_shim = each(function(file, filename){
    file.rootPath = conf_root_path;
  });
}

ms.use(
  branch(remote)
    .use(rootpath_shim)
    .use(each(function(file, filename){
      var data = file.contents.toString();
      data = replaceall("{{index}}", file.index_str || "", data);
      data = replaceall("{{root}}", file.rootPath, data);
      data = replaceall("{{asset}}", file.rootPath+"assets/", data);
      data = replaceall("{{parent}}", file.parent_path || "", data);
      file.contents = new Buffer(data);
    }))
);

ms.use(markdown({
  //smartypants: true,
  gfm: true,
  //tables: true
}));

ms.use(
  branch(remote)
    .use(layouts({
      engine:'handlebars',
      directory:'layouts',
      //partials:'layouts/partials',
      default: 'chapter.hb',
      cache: false,
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
