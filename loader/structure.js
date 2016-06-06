var md5 = require('md5');

extern = {};
module.exports = extern;

var indexPages = [];

extern.buildpath = function(page, serie){
  var path = serie.url;
  
  if(serie.config && serie.config.hierarchy){
    var hi = serie.config.hierarchy;
    //hi = hi.split(":");
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
    //path += "/" + page.meta.title;
    path += "/index";
  }else{
    //path += "/" + md5(page.toString()).substr(0, 5);
    path += "/index";
  }
  path += ".md";
  
  return path;
};

function groupBy(array, predicate){
	var d = {};
	for(var k in array){
		var v = array[k];
		k = predicate(v);
		if(d[k]){
			d[k].push(v);
		}else{
			d[k] = [];
			d[k].push(v);
		}
	}
	return d;
}

function groupPages(hi, hi_i, pages){
  var index = null;
  if(hi[hi_i].charAt(0) !== "?"){
    pages = pages.filter(function(page){
      if(page.meta && page.meta[hi[hi_i]]){
        return true;
      }else{
        index = page;
      }
      return false;
    });
  }
  var grouped = groupBy(pages, function(page){
    return page.meta[hi[hi_i]];
  });
  //console.log("|||||||")
  //console.log(grouped)
  if(hi_i+1 < hi.length){
    for(var k in grouped){
      //console.log(k)
      grouped[k] = groupPages(hi, hi_i+1, grouped[k])
    }
  }else{
    for(var k in grouped){
      grouped[k] = {"index":grouped[k][0]}
    }
  }
  if(index !== null){
    grouped['index'] = index;
  }
  
  return grouped;
}

/**
This function expects every leaf in the tree to be an object with only an index key
*/
function addIndexMeta(pages){
  var subpages = [];
  for(var sub_k in pages){
    if(sub_k === "index"){continue;}
    //console.log(sub_k)
    pages[sub_k] = addIndexMeta(pages[sub_k]);
  }
  
  return pages;
}

/*
add index pages by recursivly adding a page for each key until you reach an
object with a "series" key
*/

extern.createTree = function(pages, series){
  var final_tree = {};
  
  for(var series_i in series){
    var serie = series[series_i];
    
    if(serie.config && serie.config.hierarchy){
      var hi = serie.config.hierarchy;
      
      var series_pages = pages.filter(function(page){
        return page.series === serie.id;
      });
      var newpages = groupPages(hi, 0, pages, serie);
      
      final_tree[serie.id] = newpages;
    }
  }
  return final_tree;
};
