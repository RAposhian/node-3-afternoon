require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      ctrl = require('./products_controller'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING } = process.env;


massive({
   connectionString: CONNECTION_STRING,
   ssl: {rejectUnauthorized: false}
})
   .then(db => {
      app.set('db', db)
      console.log('DB connected')
})
   .catch(err => console.log(err))

app.use(express.json())
      
app.get(`/api/products/:id`, ctrl.getOne)
app.get(`/api/products`, ctrl.getAll)
app.post(`/api/products`, ctrl.create)
app.put(`/api/products/:id`, ctrl.update)
app.delete(`/api/products/:id`, ctrl.delete)
app.post(`/api/table`, ctrl.table)

app.listen(SERVER_PORT, () => console.log(`Server is running on port: ${SERVER_PORT}`))