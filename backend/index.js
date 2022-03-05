const express = require('express')
const cors = require('cors')
const app = express()
const uuid = require('uuid/v4')

import { init } from './mysql/mysql'
import addUser from './routes/addUser'
import getUsers from './routes/getUsers'
import deleteUser from './routes/deleteUser'

import login from './routes/login'

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

app.get('/api', (_, res) => {
	res.send('<h1>Backend Update</h1>')
})

app.post('/api/v1/users', (req, res) => {
	const user = {
		id: uuid(),
		username: req.body.username,
		password: req.body.password,
	}
	addUser(user)
		.then(() => {
			console.log(`User ${user.username} added.`)
			res.send(user)
		})
		.catch(error => {
			res.status(400).send(`Error adding user ${user.username}: ${error}`)
		})
})

app.get('/api/v1/users', (req, res) => {
	getUsers().then(users => {
		res.send(users)
	})
})

app.delete('/api/v1/users/:id', (req, res) => {
	deleteUser(req.params.id).then(() => {
		console.log(`User with id ${req.params.id} deleted.`)
		res.sendStatus(200)
	})
})

app.post('/api/v1/auth/signup', (req, res) => {
	const user = {
		id: uuid(),
		username: req.body.username,
		password: req.body.password,
	}
	addUser(user)
		.then(() => {
			console.log(`User ${user.name} added.`)
			res.send(user)
		})
		.catch(error => {
			res.status(400).send(`Error adding user ${user.username}: ${error}`)
		})
})

app.post('/api/v1/auth/signin', (req, res) => {
	// Magic
})

// app.post("/api/items", addItem)
// app.put("/api/items/:id", updateItem)
