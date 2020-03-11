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




module.exports = {
   create: (req, res, next) => {
     const db = req.app.get('db');
     const { name, description, price, image_url } = req.body;
 
     db.create_product([name, description, price, image_url])
       .then(() => res.sendStatus(200))
       .catch(err => {
         res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
         console.log(err)
       });
   },
 
   getOne: (req, res, next) => {
     const db = req.app.get('db');
     const { id } = req.params;
 
     db.read_product(+id)
       .then(product => res.status(200).send(product))
       .catch(err => {
         res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
         console.log(err)
       });
   },
 
   getAll: (req, res, next) => {
     const db = req.app.get('db');
 
     db.read_products()
       .then(products => res.status(200).send(products))
       .catch(err => {
         res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
         console.log(err)
       });
   },
 
   update: (req, res, next) => {
     const db = req.app.get('db');
     const { params, query } = req;
 
     db.update_product([params.id, query.desc])
       .then(() => res.sendStatus(200))
       .catch(err => {
         res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
         console.log(err)
       });
   },
 
   delete: (req, res, next) => {
     const db = req.app.get('db');
     const { id } = req.params;
 
     db.delete_product(+id)
       .then(() => res.sendStatus(200))
       .catch(err => {
         res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
         console.log(err)
       });
   },
 
   table: (req, res) => {
      const db = req.app.get('db');
      db.seed()
      .then(()=> res.sendStatus(200))
      .catch(err => console.log(err))
   }
}