const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const controller = {
  saveProduct: async (req, res) => {
    
    const errors = validationResult(req.body);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, price, stock, category }=req.body;

    try {
      
      const product_already = await Product.count({
        where: { name },
      });

      if (product_already) {
          res.status(400).json({
            msg: "!Error. Ya existe un producto con el nombre que introduciste"
          });

          return;
      }

      const product = new Product({ name, price, stock, category });
      const productStored = await Product.create(product.dataValues);

      res.status(200).json({
        productStored
      });

    } catch (error) {
      res.status(500).json({ msg: "Upss.Tenemos un problema en el servidor.", error });
    }
  },

  //Método para subir imágenes
  uploadImage: async (req, res) => {
    //producto para actualizar
    const productId = req.params.id;

    console.log(req.file);

    if (req.file) {
      const filePath = req.file.path;
      const fullName = req.file.originalname;
      const extension = req.file.originalname.substring(
        fullName.lastIndexOf(".", fullName.length)
      );
      const finalName = filePath
        .substring(filePath.lastIndexOf("/", filePath.length))
        .split("/")[1];

      if (extension === ".png" || extension === ".gif" || extension === ".jpg" || extension===".jpeg" ) {
        const product = await Product.findByPk(productId);
        product.image = finalName;

        await product.save();

        res.json({product, msg:"!Qué bien. Producto guardado exitosamente."});
      } else {
        fs.unlinkSync(
          path.join(__dirname + `../../public/uploads/${finalName}`)
        );
        res.status(400).json({ msg: "Extensión no válida" });
      }
    }
  },

  //get products
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.json({ products });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  //get Image
  getImage: async (req, res) => {
    const file = req.params.image;
    const pathFile = path.join(__dirname + `../../public/uploads/${file}`);
    fs.exists(pathFile, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(pathFile));
      } else {
        return res.status(200).json({
          msg: "No existe la imagen",
          pathFile,
          file,
        });
      }
    });
  },

  //update add to car
  updateCar: async (req, res) => {
    const { id } = req.params;

    try {
      let product = await Product.findByPk(id);
      let { car } = product.dataValues;
      if (car === 0) {
        car = 1;
      } else {
        car = 0;
      }

      const updated = Product.update({ car }, { where: { id } });

      return res.json({
        msg: car === 1 ? "Añadido al carrito." : "Se ha quitado del carrito.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  //product by car
  getCar: async (req, res) => {
    try {
      let products_cars = await Product.findAll({
        attributes: ["id","name", "price", "stock", "image"],
        where: {
          car: 1,
        },
      });

      res.json({
        products: products_cars,
      });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error en el servidor." });
    }
  },

  //Obtiene el número de productos
  getCountProducts: async(req,res)=>{
    let count;
    try {
      count=await Product.findAndCountAll();
      return res.json(count);
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error en el servidor." });
    }
  }

};

module.exports = controller;
