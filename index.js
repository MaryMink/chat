var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(1500);

app.use(express.static(__dirname + '/public')); 

connections = [];

io.sockets.on('connection', function(socket) {
	console.log("connect");
	connections.push(socket);
	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("disconnect");
	});

	socket.on('send mess', function(data) {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});
});