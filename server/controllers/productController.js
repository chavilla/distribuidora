const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const controller = {
  saveProduct: async (req, res) => {
    const errors = validationResult(req.body);
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

  //Método para subir imágenes
  uploadImage: async (req, res) => {
    //producto para actualizar
    const productId = req.params.id;

    if (req.file) {
      const filePath = req.file.path;
      const fullName = req.file.originalname;
      const extension = req.file.originalname.substring(
        fullName.lastIndexOf(".", fullName.length)
      );
      const finalName = filePath
        .substring(filePath.lastIndexOf("/", filePath.length))
        .split("/")[1];

      if (extension == ".png" || extension == ".gif" || extension == ".jpg") {
        const product = await Product.findByPk(req.params.id);
        product.image = finalName;

        await product.save();

        res.json(product);
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
      return res.json({products});
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  //get Image
  getImage:async (req,res)=>{
    const file=req.params.image;
    const pathFile=path.join(__dirname + `../../public/uploads/${file}`);
    fs.exists(pathFile,(exists)=>{
      if (exists) {
        return res.sendFile(path.resolve(pathFile));
      }
      else{
        return res.status(200).json({
          msg: 'No existe la imagen',
          pathFile,
          file
        })
      }
    })
  },

  //product by car
  getCar:async(req,res)=>{

    try {
      let products_cars=await Product.findAll({
        where:{
          car:1
        }
      });

      res.json({
        products: products_cars
      })
     
    } catch (error) {
      res.status(500).json({msg: 'Hubo un error en el servidor.'})
    }
  }
};

module.exports = controller;
