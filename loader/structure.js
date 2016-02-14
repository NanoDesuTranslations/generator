var md5 = require('md5');

extern = {};
module.exports = extern;

var indexPages = [];

extern.buildpath = function(page, serie){
  var path = serie.url;
  
  if(serie.config && serie.config.hierarchy){
    var hi = serie.config.hierarchy;
    hi = hi.split(":");
    for(var i in hi){
      var part = hi[i];
      var partoptional = hi[i].charAt(0) == "?";
      if(partoptional){
        part = part.substring(1);
      }
      
      if(page.meta[part]){
        path += "/" + part + page.meta[part];
      }else{
        break;
      }
    }
  }
  
  if(page.meta && page.meta.url){
    //path += "/" + page.meta.url;
    path += "/index";
  }else if(page.meta && page.meta.title){
    path += "/" + page.meta.title;
  }else{
    //path += "/" + md5(page.toString()).substr(0, 5);
    path += "/index";
  }
  path += ".md";
  
  return path;
};
