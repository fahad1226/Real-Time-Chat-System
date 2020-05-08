const socket = io()


socket.on('message', (message) => {
	console.log(message)
});


document.querySelector('#message-form').addEventListener('submit', (e) => {
	e.preventDefault()
	//const message = document.querySelector('input').value 
	const message = e.target.elements.message.value; // an alternative way if name field is exists
	socket.emit('sendMessage', message)
})

