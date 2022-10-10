const ConnectToMongo = require('./db');
const express = require('express')
const cors = require('cors') 
const app = express()
const port = 5000

app.use(cors());
ConnectToMongo();
app.use(express.json())

//Available Routes to use
app.use('/api/auth', require('./routes/auth'))
app.use('/api/task', require('./routes/task'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})