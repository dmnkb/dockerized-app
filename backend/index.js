const express = require('express')
const cors = require('cors')
const app = express()
const uuid = require('uuid/v4')

import { init } from './mysql/mysql'
import addUser from './routes/addUser'
import getUsers from './routes/getUsers'

app.use(express.json())
app.use(cors())
app.options('*', cors())

init()
	.then(() => {
		app.listen(5000, () => console.log('Listening on port 5000'))
	})
	.catch(() => {
		console.error(err)
		process.exit(1)
	})

// entry point
app.get('/api', (_, res) => {
	res.send('<h1>Backend Update</h1>')
})

// ADD User
app.post('/api/users', (req, res) => {
	const user = {
		id: uuid(),
		username: req.body.username,
		password: req.body.password,
	}
	addUser(user).then(() => {
		console.log(`user ${user.username} added.`)
	})
	res.send(user)
})

// GET users
app.get("/api/users", (req, res) => {
	getUsers().then((users) => {
		res.send(users)
	})
})

// app.post("/api/items", addItem)
// app.put("/api/items/:id", updateItem)
// app.delete("/api/items/:id", deleteItem)