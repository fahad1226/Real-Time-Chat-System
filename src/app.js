const express = require('express')
const path = require('path')
const http = require('http')
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const socketio = require('socket.io');

const app = express()
const server = http.createServer(app);
const io = socketio(server)


const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
	console.log('new websocket is connected');


	socket.on('join', (options, callback) => {
		const { error, user } = addUser({ id: socket.id, ...options})

		if (error) {
			return callback(error)
		}

		socket.join(user.room)
		socket.emit('message', generateMessage('welcome!'))
		socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the room`))
		callback()
	})


	socket.on('sendMessage', (message, callback) => {
		const filter = new Filter()
		if (filter.isProfane(message)) {
			return callback("we're sorry that profanity is not allowed.")
		}

		io.emit('message', generateMessage(message))
		callback()
	})
	
	socket.on('disconnect', () => {
		const user = removeUser(socket.id)
		if (user) {
			io.to(user.room).emit('message', generateMessage(`${user.username} has left the chat`))
		}
	})


	socket.on('senLocation', (coords, callback) => {
		io.emit('location', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
		callback()
	})

	/*const message = "welcome to your chatt application"
	socket.emit('welcomeMsg', message) */
})


const port = process.env.PORT || 3000

server.listen(port, () => {
	console.log(`server has started on port ${port} `);
})