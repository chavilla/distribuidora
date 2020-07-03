const Product = require("../models/Product");
const { validationResult } = require("express-validator");

const controller = {
  saveProduct: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const product = new Product(req.body);
      const productStored = await Product.create(product.dataValues);

      res.status(200).json({
        productStored,
      });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },

  //get products
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ msg: products });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
};

module.exports = controller;
