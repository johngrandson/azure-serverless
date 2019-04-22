// HTTP GET request without options
exports.getUrl = function(url) {
    let req = require('url').parse(url);
    return httpClient(req);
};
  
// HTTP GET request for JSON API resources
exports.getJSON = function(url, headers = {}) {
    let req = require('url').parse(url);
    req.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    Object.assign(req.headers, headers);
    return httpClient(req)
      .then((resp) => {return JSON.parse(resp)})
};
  
// HTTP POST request for JSON API resources
exports.postJSON = function(url, data, headers = {}) {
    let req = require('url').parse(url);
    req.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    Object.assign(req.headers, headers);
    req.method = 'POST';
    return httpClient(req, typeof data == 'object' ? JSON.stringify(data) : data)
      .then((resp) => {return JSON.parse(resp)})
};
  
// Generic HTTP request with full control
exports.httpClient = function(req, sendbody = null) {
    return new Promise((resolve, reject) => {
      const lib = req.protocol && req.protocol.startsWith('https') ? require('https') : require('http');
      const request = lib.request(req, (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        let body = [];
        response.on('data', (chunk) => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      });
      request.on('error', (err) => reject(err));
      if(sendbody) request.write(sendbody);
      request.end();
    })
};