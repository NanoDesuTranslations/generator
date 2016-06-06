extern = {};
module.exports = extern;

function extend(a, b){
  for(var k in b){
    a[k] = b[k];
  }
}

/*Temp method to generate index page, this should probably be handled by templates.*/
function indexPageStr(subpaths, current, hier){
  var str = "auto generated index\n\n";
  current = current.split("/");
  series_name = current[0];
  current = current.slice(1);
  str += "Series: " + series_name + "\n\n";
  //str += current + "\n\n"
  for(var i in current){
    str += hier[i] + " " + current[i] + ", ";
  }
  str += "\n\n";
  var sub_part = hier[current.length];
  for(var k in subpaths){
    str += "[" + sub_part + " " + subpaths[k][1] + "](" + subpaths[k][1] + ")\n\n";
  }
  return str;
}

function collapse(node, serie, path){
  var mspage = {mode:'0666', series:serie};
  mspage.subpaths = [];
  
  var pages = {};
  pages[path+"/index.md"] = mspage;
  for(var subnode_k in node){
    if(subnode_k === "index"){continue;}
    var subnode = node[subnode_k];
    var subpath = path+"/"+subnode_k;
    var subpages = collapse(subnode, serie, subpath);
    extend(pages, subpages);
    mspage.subpaths.push([subpath, subnode_k]);//[absolute path, relative path]
  }
  
  if(node.index && node.index.content){
    mspage.index_str = indexPageStr(mspage.subpaths, path, serie.config.hierarchy);
    mspage.contents = new Buffer(node.index.content);
  }else{
    mspage.contents = new Buffer(indexPageStr(mspage.subpaths, path, serie.config.hierarchy));
  }
  
  return pages;
}

extern.pages = function(tree, series){
  pages = {};
  for(var serie_id in tree){
    var serie = series[serie_id];
    //var path = serie.name.toLowerCase().replace(" ", "-");
    var path = serie.url;
    var newpages = collapse(tree[serie_id], serie, path);
    extend(pages, newpages);
  }
  return pages;
};
