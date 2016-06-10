extern = {};
module.exports = extern;


extern.fromtree = function(tree, series){
  var sample_navigation = [
    {label:"About this translation"},
    {
      label:"Volume 1",
      items:[
        {label:"Color Illustrations"},
        {
          label:"Part 1: Amaterasu",
          items:[
            {label:"Chapter 1"},
            {
              label:"Chapter 2", 
              items:[
                {label:"2-1"},
                {label:"2-2"},
              ]
            },
          ]
        },
      ]
    },
    {label:"Volume 2"},
    {label:"Update History"},
    {label:"Contact Us"},
  ];
  
  function buildNavigation(node, hier){
    var data = [];
    for(var k in node){
      if(k === "index" || typeof node[k] !== "object"){continue;}
      var s_node = node[k];
      var label = hier[0] + " " + k;
      try{
        label += ": " + s_node.index.meta.title;
      }catch(err){}
      var s_data = {label:label};
      
      var items = buildNavigation(s_node, hier.slice(1));
      if(items){
        s_data.items = items;
      }
      
      data.push(s_data);
    }
    
    return data;
  }
  
  var navigation = {};
  for(var series_k in tree){
    var serie = series[series_k];
    
    var hier = serie.config.hierarchy;
    
    var s_nav = buildNavigation(tree[series_k], hier);
    navigation[series_k] = s_nav;
  }
  
  
  return navigation;
};
