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
		return user.room == room && user.username == username
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
	const index = users.findIndex((user) => user.id == id)

	if (index !== -1) {
		users.splice(index, 1)[0]
	}
}

addUser({
	id: 2,
	username: 'Tamim Iqbal',
	room: 'New York'
})
console.log(users)

// const res = addUser({
// 	id: 200,
// 	username: 'Tamim Iqbal',
// 	room: 'New York'
// })

// console.log(res)


removeUser(2)
console.log(users)