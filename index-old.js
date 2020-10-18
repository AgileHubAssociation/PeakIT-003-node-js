const http = require('http');

const port = 80;

function doOnIncomingRequest(request, response) {
  console.log(`Incoming request from: ${request.url}`);

  if (request.url === '/users') {
    const users = [
      'User1',
      'User2'
    ];

    return response.end(JSON.stringify(users));
  }

  response.end(`Route does not exist ${request.url}`);
}

const server = http.createServer(doOnIncomingRequest);

server.listen(port, () => {
  console.log(`Server started lisening on port: ${port}`);
});
