let socket = new WebSocket(process.env.VUE_APP_WS_URL);

//@TODO add config

socket.onopen = function() {
  if (user) {
    socket.send(JSON.stringify({
      type: 'auth',
      token: user.access_token
    }));
  }
};

socket.onmessage = function(event) {
  var data = JSON.parse(event.data);
  console.log(data);
  if (data.type === 'notification') {
    console.log('message', data.message)
  }
};
