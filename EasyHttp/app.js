const http = new EasyHTTP();



http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, res){
  if(error===null) console.log(res);
});
