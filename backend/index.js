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

app.get('/api', (req, res) => {
  res.send('<h1>Backend</h1>')
});
app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);


db.init().then(() => {
	app.listen(3000, () => console.log('Listening on port 3000'));
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