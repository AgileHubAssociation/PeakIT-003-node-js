const express = require('express');
const path = require('path');

const port = 80;
const app = express();

const users = [
  'User1',
  'User2'
];

function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    console.log('User is authenticated!');
    next();
  } else {
    console.error('User is unauthenticated!');
    response.status(401).send();
  }
}

app.use((request, response, next) => {
  console.log(`Incoming request from ${request.url}`);
  next();
});

app.get('/users', authMiddleware, (request, response) => {
  response.send(users);
});

app.patch('', () => {});
app.put(() => {});
app.delete(() => {});

app.post('/users', authMiddleware, express.json(), (request, response) => {
  const user = request.body;

  // Verify if already exists
  // Validate data
  try {
    users.push(user);
    response.status(201).send(users);
  } catch(err) {
    // client error / server error
    // create new error object to send to client
    response.status(500).send(err);
  }
});

app.use(express.static(path.resolve(__dirname, '.')));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

app.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
})
