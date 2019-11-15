var express = require('express');
var router = express.Router();

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', function (req, res, next) {
  res.render('index', 
  { 
    title: 'Ethoca Shopping Cart',
    products: products
  }
  );
});

router.get('/checkout', function(req, res, next) {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  req.session.cart = cart;
  console.log(req.session.cart.items);
  res.redirect('/');
});

router.get('/adds', function(req, res, next) {
  var productId = req.query.productId;
  var counts = parseInt(req.query.counts);
  console.log("How many do you want?");
  console.log(productId + " : " +counts);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.adds(product[0], productId, counts);
  req.session.cart = cart;
  res.redirect('/');
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'Ethoca Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

module.exports = router;
