let WebSocket = require('ws');
let dotenv = require('dotenv');
let amqp = require('amqplib/callback_api');

dotenv.load();

let server = new WebSocket.Server({ port: 8000 });

server.on('connection', function (ws, request) {
  console.log('connected: %s', request.connection.remoteAddress);

  ws.on('message', function (message) {
    let data = JSON.parse(message);
    console.log('data', data);
  });
});

amqp.connect(process.env.WS_AMQP_URI, function(err, conn) {
  if (err) {
    console.log(err);
    return;
  }
  conn.createChannel(function(err, ch) {
    let queue = 'notifications';
    ch.consume(queue, function(message) {
      // console.log('fields: %s', message.fields);
      // console.log('properties: %s', message.properties);
      console.log('message: %s', message.content.toString());
      server.clients.forEach(ws => {
        ws.send(message.content.toString());
      })
    }, {noAck: false}); // will store at memory not remove 
  });
});
