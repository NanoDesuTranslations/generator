var md5 = require('md5');

extern = {};
module.exports = extern;

var indexPages = [];

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
      }else if(page.meta[hi[0]]){
        index = page;
      }
      return false;
    });
  }
  var grouped = groupBy(pages, function(page){
    return page.meta[hi[hi_i]];
  });
  
  if(hi_i+1 < hi.length){
    for(var k in grouped){
      grouped[k] = groupPages(hi, hi_i+1, grouped[k]);
    }
  }else{
    for(var k in grouped){
      grouped[k] = {"index":grouped[k][0]};
    }
  }
  if(index !== null){
    grouped.index = index;
  }
  
  return grouped;
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

extern.getSpecial = function(pages, series, byUrl){
  var special_pages = {}
  
  for(var series_i in series){
    var serie = series[series_i];
    
    var series_pages = pages.filter(function(page){
      return page.series === serie.id;
    });
    
    var series_pages_special = series_pages.filter(function(page){
      return page.meta.path;
    });
    
    special_pages[byUrl ? serie.url:serie.id] = series_pages_special;
  }
  
  return special_pages;
};
