import connect from './connect'

let pool

// create database if not existing and establish connection
export const init = async () => {
	return new Promise((resolve, reject) => {
		connect()
			.then(queryPool => {
				pool = queryPool
				resolve()
			})
			.catch(err => {
				reject(err)
			})
	})
}

// expose pool variable
export const getPool = () => {
	return pool
}

// Gently shut down server in order to prevent port clash
const gracefulShutdown = () => {
	teardown()
		.catch(() => {})
		.then(() => process.exit())
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
process.on('SIGUSR2', gracefulShutdown) // Sent by nodemon

export const teardown = async () => {
	return new Promise((resolve, reject) => {
		pool.end(error => {
			if (error) reject(error)
			else resolve()
		})
	})
}



// async function getItems() {
// 	return new Promise((acc, rej) => {
// 		pool.query("SELECT * FROM todo_items", (err, rows) => {
// 			if (err) return rej(err)
// 			acc(
// 				rows.map(item =>
// 					Object.assign({}, item, {
// 						completed: item.completed === 1,
// 					})
// 				)
// 			)
// 		})
// 	})
// }

// async function getItem(id) {
// 	return new Promise((acc, rej) => {
// 		pool.query("SELECT * FROM todo_items WHERE id=?", [id], (err, rows) => {
// 			if (err) return rej(err)
// 			acc(
// 				rows.map(item =>
// 					Object.assign({}, item, {
// 						completed: item.completed === 1,
// 					})
// 				)[0]
// 			)
// 		})
// 	})
// }

// async function storeItem(item) {
// 	return new Promise((acc, rej) => {
// 		pool.query(
// 			"INSERT INTO todo_items (id, name, completed) VALUES (?, ?, ?)",
// 			[item.id, item.name, item.completed ? 1 : 0],
// 			err => {
// 				if (err) return rej("Error in express: " + err)
// 				acc()
// 			}
// 		)
// 	})
// }

// async function updateItem(id, item) {
// 	return new Promise((acc, rej) => {
// 		pool.query(
// 			"UPDATE todo_items SET name=?, completed=? WHERE id=?",
// 			[item.name, item.completed ? 1 : 0, id],
// 			err => {
// 				if (err) return rej(err)
// 				acc()
// 			}
// 		)
// 	})
// }

// async function removeItem(id) {
// 	return new Promise((acc, rej) => {
// 		pool.query("DELETE FROM todo_items WHERE id = ?", [id], err => {
// 			if (err) return rej(err)
// 			acc()
// 		})
// 	})
// }

// module.exports = {
// 	init,
// 	teardown,
// 	getItems,
// 	getItem,
// 	storeItem,
// 	updateItem,
// 	removeItem,
// }
