const socket = io()


socket.on('message', (message) => {
	console.log(message)
});



document.querySelector('#message-form').addEventListener('submit', (e) => {
	e.preventDefault()
	//const message = document.querySelector('input').value 
	const message = e.target.elements.message.value; // an alternative way if name field is exists
	socket.emit('sendMessage', message, (error) => {

		if (error) {
			return console.log(error);
		}
		console.log('your message was deleivered');
	})
});


document.querySelector('#send-location').addEventListener('click', () => {
	if (!navigator.geolocation) {
		alert("youre browser does not support geolocation")
	}
	navigator.geolocation.getCurrentPosition((position) => {
		
		socket.emit('senLocation', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}, () => {
			console.log("location shared");
		})
	})
});
