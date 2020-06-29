const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const userController = {
  addUser: async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      //Create an user
      
      const user_already =await User.count({ where: { email: req.body.email } });

      if (user_already > 0) {
        res.json({
          msg: "Ya existe un usuario con este email",
        });

        return;
      }

      const user = new User({ name, email, password, role });
      const salt = await bcryptjs.genSalt(10);
      user.dataValues.password = await bcryptjs.hash(password, salt);
      await User.create(user.dataValues);

      res.json({
        msg: "Usuario creado correctamente",
      });
    } catch (error) {
      res.json({
        msg: error,
      });
    }
  },
};

module.exports = userController;
