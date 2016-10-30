

module.exports = {
  addBlog: addBlog
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

function sorted_post_keys(posts){
  var keys = Object.keys(posts);
  keys = keys.sort(function(a, b){
    a = posts[a];
    b = posts[b];
    if(a.meta.blog.pinned && !b.meta.blog.pinned){
      return -1;
    }else if(!a.meta.blog.pinned && b.meta.blog.pinned){
      return 1;
    }
    if(a.meta.blog.publish_date < b.meta.blog.publish_date){
      return -1;
    }else if(a.meta.blog.publish_date > b.meta.blog.publish_date){
      return 1;
    }
    return 0;
  });
  return keys;
}

function addBlog(tree, posts){
  now = Date.now();
  posts = posts.filter(function(post){
    return post.meta.blog.publish_date < now || post.meta.blog.publish_date === undefined;
  });
  posts = groupBy(posts, function(post){return post.series;});
  
  for(var serie in posts){
    var s_posts = posts[serie];
    var s_content = "";
    for(var post_i of sorted_post_keys(s_posts)){
      post = s_posts[post_i];
      s_content += "<h2>" + post.meta.title + "</h2>";
      s_content += "<p>" + post.content + "</p><hr style='border-color:white' />";
    }
    tree[serie].index = {
      content: s_content,
      meta:{
        title: "Blog",
      },
    };
  }
  
  return tree;
}
