const socket = io()


// Elements

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')


// template

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

// options

const { username,room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
	console.log(message)
	const html = Mustache.render(messageTemplate, {
		message: message.text,
		createdAt: moment(message.createdAt).format('h:mm a')
	})
	$messages.insertAdjacentHTML('beforeend', html)
});


socket.on('location', (message) => {
	console.log(message);
	const location = Mustache.render(locationMessageTemplate, {
		url: message.url,
		createdAt: moment(message.createdAt).format('h:mm a')
	})
	$messages.insertAdjacentHTML('beforeend', location)
})



$messageForm.addEventListener('submit', (e) => {
	e.preventDefault()

	$messageFormButton.setAttribute('disabled', 'disabled')
	const message = e.target.elements.message.value; 
	socket.emit('sendMessage', message, (error) => {
		$messageFormButton.removeAttribute('disabled')
		$messageFormInput.value = '';
		$messageFormInput.focus()
		if (error) {
			return console.log(error);
		}
		console.log('your message was deleivered');
	})
});


$sendLocationButton.addEventListener('click', () => {

	$sendLocationButton.setAttribute('disabled', 'disabled')
	
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
	$sendLocationButton.removeAttribute('disabled')
});


socket.emit('join', { username,room })