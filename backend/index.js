const express = require('express')
const cors = require('cors')
const app = express()
const uuid = require('uuid/v4')

import { init } from './mysql/mysql'
import addUser from './routes/addUser'
import getUser from './routes/getUser'

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
	res.send('<h1>Backend</h1>')
})

app.post('/api/v1/auth/signup', (req, res) => {
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
			console.warn(error)
			res.status(400).send(error)
		})
})

app.post('/api/v1/auth/signin', (req, res) => {
	const reqUser = {
		id: uuid(),
		username: req.body.username,
		password: req.body.password,
	}
	getUser(reqUser.username)
		.then(user => {
			if (user[0].password === reqUser.password) {
				res.send(200)
			} else {
				res.send(401)
			}
		})
		.catch(error => {
			console.warn(error)
			res.status(400).send(error)
		})
})

// app.post("/api/items", addItem)
// app.put("/api/items/:id", updateItem)
