const express = require("express");
const productRouter = express.Router(),
  Product = require("../models/productModel");

productRouter
  .route("/")
  .get((req, res) => {
    Product.find({}, (err, articles) => {
      res.json(articles);
    });
  })

  .post((req, res) => {
    let article = new Product(req.body);
    article.save();
    res.status(201).send(article);
  });

productRouter.use("/:productId", (req, res, next) => {
  Product.findById(req.params.productId, (err, product) => {
    if (err) res.status(404).send(err);
    else {
      req.product = product;
      next();
    }
  });
});

productRouter
  .route("/:productId")
  .get((req, res) => {
    res.json(req.product);
  })

  .patch((req, res) => {
    Product.update(
      { "stock.size": req.body.stock[0].size },
      { $set: { "stock.$.quantity": req.body.stock[0].quantity } }
    )
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: "Product not found with id " + req.params.productId
          });
        }
        res.send(product);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Product not found with id " + req.params.productId
          });
        }
        return res.status(500).send({
          message: "Error updating product with id " + req.params.productId
        });
      });
  });

module.exports = productRouter;
