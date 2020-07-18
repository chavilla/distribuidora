const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const userController = {
  addUser: async (req, res) => {
    //if the validation is false
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuing to the req.body
    const { name, email, password, role } = req.body;

    try {
      //if an user already exists
      const user_already = await User.count({
        where: { email: req.body.email },
      });

      if (user_already > 0) {
        res.status(400).json({
          msg: "Ya existe un usuario con este email",
        });

        return;
      }

      // if there is not errors create an user
      const user = new User({ name, email, password, role });
      const salt = await bcryptjs.genSalt(10);
      user.dataValues.password = await bcryptjs.hash(password, salt);
      await User.create(user.dataValues);

      res.json({ msg: "Usuario creado con éxito" });
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  },
};

module.exports = userController;
