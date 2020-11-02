const Sale = require("../models/Sale");
const Product = require("../models/Product");
const shorId = require("shortid");
const saleController = {
  addSale: async (req, res) => {
    const { payment, products, userId, total } = req.body;

    try {
      //Se genera un id
      const id = shorId.generate();

      const sale = new Sale({
        id,
        payment,
        products,
        userId,
        total,
      });

      const saleStored = await Sale.create(sale.dataValues);

      if (saleStored) {
      }

      res.json(saleStored);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};


module.exports=saleController;