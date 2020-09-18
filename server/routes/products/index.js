const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const { check } = require("express-validator");
const multer = require("multer");
const path=require('path');
const shortid=require('shortid')

//Multer para subir imágenes
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: (req, file, cb) => {
      const extension=file.originalname.substring(file.originalname.lastIndexOf('.',file.originalname.length));
    cb(null, `${shortid.generate()}.${extension}`);
  },
});

//Middleware
const upload = multer({
  storage,
  dest: path.join(__dirname, "../public/uploads"),
}).single("image");

router.post(
  "/",
  [
    check("name", "El nombre es un campo requerido").trim().not().isEmpty(),
    check("price", "El precio debe ser numérico").isFloat()
  ],
  productController.saveProduct
);

router.post("/image/:id",upload,productController.uploadImage);
router.get("/", productController.getProducts);
router.get("/getImage/:image", productController.getImage);
router.get("/car", productController.getCar);
router.get("/count", productController.getCountProducts);
router.put("/:id", productController.updateCar);

module.exports = router;
