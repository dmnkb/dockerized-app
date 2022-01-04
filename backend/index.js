const express = require("express")

const app = express()

app.get('/api', (req, res) => {
  res.send('<h1>Hallo Welt Backend</h1>')
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})