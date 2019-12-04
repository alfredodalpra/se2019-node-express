/**
 * app.js
 * Implementation of the Product API
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies

// starting the server
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Products server listening at http://localhost:' + port);
});

// list of products we'll keep in memory
let products = [
  {
    id: 1,
    name: 'iPhone XL',
    description: 'Extra large'
  }
];

app.get('/api/products', function(req, res) {
  res.status(200);
  res.json(products);
});

// Getting an individual product
app.get('/api/products/:id', function(req, res) {
  const id = parseInt(req.params.id);

  if (id > products.length || id < 1) {
    res.status(404).send();
    return;
  }
  res.json(products[id - 1]);
});

// adding a new product to the collection
app.post('/api/products', function(req, res) {
  let product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(200);
  res.json(product);
});
