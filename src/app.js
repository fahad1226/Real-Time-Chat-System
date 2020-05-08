const express = require('express')
const path = require('path')
const http = require('http')
const Filter = require('bad-words');

const socketio = require('socket.io');


const app = express()
const server = http.createServer(app);
const io = socketio(server)


const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {
	console.log('new websocket is connected');

	//socket.broadcast.emit('message', 'a new user has joined.')
	socket.broadcast.emit('message', 'A new user has just joined the chat.')
	socket.on('sendMessage', (message, callback) => {
		
		const filter = new Filter()
		
		if (filter.isProfane(message)) {
			return callback("we're sorry that profanity is not allowed.")
		}

		io.emit('message', message)
		callback()
	})
	
	socket.on('disconnect', () => {
		io.emit('message', 'a user has just left the chat.')
	})


	socket.on('senLocation', (coords, callback) => {
		io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
		callback()
	})

	/*const message = "welcome to your chatt application"
	socket.emit('welcomeMsg', message) */
})


const port = process.env.PORT || 3000

server.listen(port, () => {
	console.log(`server has started on port ${port} `);
})