const express = require("express")
const cors = require('cors');
const app = express()
const db = require('./mysql');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(cors());
app.options('*', cors())

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.get('/api', (req, res) => {
  res.send('<h1>Backend Update 6</h1>')
});
app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);


db.init().then(() => {
	app.listen(5000, () => console.log('Listening on port 5000'));
}).catch((err) => {
	console.error(err);
	process.exit(1);
});

const gracefulShutdown = () => {
  db.teardown()
      .catch(() => {})
      .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon