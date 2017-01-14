
var req = function(url, cb){
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(data);
    });
}

export default {
  getPost: function(id, cb){
    req('/api/post/'+id, cb);
  },
  getPosts: function(cb){
    req('/api/posts/', cb);
  }
};
