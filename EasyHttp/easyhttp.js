function EasyHTTP() {
  this.http = new XMLHttpRequest();
}

EasyHTTP.prototype.get = function(url, callback) {
  this.http.open('GET', url, true);

  this.http.addEventListener("load", function() {
    if(this.status === 200) {
      callback(null, this.responseText);
    } else {
      callback('Error: '+this.status);
    }
  });

  this.http.send();
}

EasyHTTP.prototype.delete = function(url, callback) {
  this.http.open('DELETE', url, true);

  this.http.addEventListener("load", function() {
    if(this.status === 200) {
      callback(null, this.responseText);
    } else {
      callback('Error: '+this.status);
    }
  });

  this.http.send();
}

EasyHTTP.prototype.post = function(url, data, callback) {

  this.http.open('POST', url, true);

  this.http.setRequestHeader('content-type', 'application/json');

  this.http.addEventListener("load", function() {
    callback(null, this.responseText);
  });

  this.http.send(JSON.stringify(data));

}

EasyHTTP.prototype.put = function(url, data, callback) {

  this.http.open('PUT', url, true);

  this.http.setRequestHeader('content-type', 'application/json');

  this.http.addEventListener("load", function() {
    callback(null, this.responseText);
  });

  this.http.send(JSON.stringify(data));

}
