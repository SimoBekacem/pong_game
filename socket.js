function listen(io) {
	const pongNameSpace = io.of('/pong');
	let readyPlayerCount = 0;
	let room;
	pongNameSpace.on('connection', (socket) => {
		console.log('connetion to the client.', socket.id);
		socket.on('ready', () => {
			console.log(
				`the player ${socket.id} is ready to play in the room ${room}.`
			);
			room = 'room' + Math.floor(readyPlayerCount / 2);
			socket.join(room);
			readyPlayerCount++;
			if (readyPlayerCount % 2 === 0) {
				pongNameSpace.in(room).emit('startGame', socket.id);
			}
		});
		socket.on('paddleMove', (paddleData) => {
			socket.to(room).emit('paddleMove', paddleData);
		});
		socket.on('ballMove', (ballData) => {
			socket.to(room).emit('ballMove', ballData);
		});
		socket.on('disconnect', (reason) =>
			console.log(
				`the player ${socket.id} disconnect for this reason: ${reason}.`
			)
		);
	});
}

module.exports = {
	listen,
};
