const users = []


const addUser = ({id, username, room}) => {
	// clean the data

	username = username.trim().toLowerCase()
	room = room.trim().toLowerCase()


	// validate the data

	if (!username || !room) {
		return {
			error: "username and room are required"
		}
	}

	//check for existing user

	const existingUser = users.find((user) => {
		return user.room == room && user.username === username
	})


	if (existingUser) {
		return {
			error: "username is in use!"
		}
	}


	// store the user

	const user = { id, username, room}
	users.push(user)
	return {user}
}



// remove user

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id)

	if (index !== -1) {
		users.splice(index, 1)[0]
	}
}


// get user

const getUser = (id) => {
	const user = users.find((user) => user.id === id)
	return user.username;
}

// get user in room

const getUsersInRoom = (room) => {
	room = room.trim().toLowerCase()
	return users.filter((user) => user.room === room)
}

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom
}

























/*addUser({
	id: 1,
	username: 'Tamim Iqbal',
	room: 'Dhaka'
})

addUser({
	id: 2,
	username: 'Fahad Bin Munir',
	room: 'Dhaka'
})

addUser({
	id: 3,
	username: 'Bill Gates',
	room: 'New York'
})
console.log(users)
console.log(getUser(2))

const print = console.log

const userList = getUsersInRoom('Dhaka')
print(userList)

const res = addUser({
	id: 200,
	username: 'Tamim Iqbal',
	room: 'New York'
})

console.log(res)


removeUser(2)
console.log(users)*/