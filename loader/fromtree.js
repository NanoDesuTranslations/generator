extern = {};
module.exports = extern;

function extend(a, b){
  for(var k in b){
    a[k] = b[k];
  }
}

/*Temp method to generate index page, this should probably be handled by templates.*/
function indexPageStr(subpaths, current, hier, parent){
  var str = "";
  //str = "auto generated index\n\n";
  //str += "[up]({{root}}{{parent}})\n\n";
  current = current.split("/");
  series_name = current[0];
  current = current.slice(1);
  //str += "Series: " + series_name + "\n\n";
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

function sorted_node_keys(node){
  var keys = Object.keys(node);
  keys = keys.sort(function(a, b){
    a_k = a;
    b_k = b;
    a = node[a].index;
    b = node[b].index;
    if(a === undefined || b === undefined){return 0;}
    else if(a === undefined){return -1;}
    else if(b === undefined){return 1;}
    else if(a.meta.order === undefined && b.meta.order === undefined){
      if(a_k < b_k){return -1;}
      else if(a_k > b_k){return 1;}
      else{return 0;}
    }
    else if(a.meta.order === undefined){return b.meta.order<0?-1:1;}
    else if(b.meta.order === undefined){return a.meta.order<0?1:-1;}
    else if(a.meta.order < b.meta.order){return -1;}
    else if(a.meta.order > b.meta.order){return 1;}
    else{return 0;}
  });
  return keys;
}

function collapse(node, serie, path, parent_path){
  var mspage = {mode:'0666', series:serie};
  mspage.parent_path = parent_path;
  mspage.subpaths = [];
  
  var pages = {};
  pages[path+"/index.md"] = mspage;
  if(node.index !== undefined){
    node.index.path = path;
  }
  for(var subnode_k of sorted_node_keys(node)){
    if(subnode_k === "index"){continue;}
    var subnode = node[subnode_k];
    var subpath = path+"/"+subnode_k;
    var subpages = collapse(subnode, serie, subpath, path);
    extend(pages, subpages);
    mspage.subpaths.push([subpath, subnode_k]);//[absolute path, relative path]
  }
  
  if(node.index && node.index.content){
    mspage.index_str = indexPageStr(mspage.subpaths, path, serie.config.hierarchy);
    mspage.contents = new Buffer(node.index.content);
    mspage.title = node.index.meta.title;
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
    var newpages = collapse(tree[serie_id], serie, path, "");
    extend(pages, newpages);
  }
  return pages;
};
