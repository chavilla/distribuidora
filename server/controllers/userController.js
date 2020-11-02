const User = require("../models/User");
const jwt=require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const shortid=require("shortid");

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

      const id_to_user=shortid.generate();

      // if there is not errors create an user
      const user = new User({
        id:id_to_user,
        name,
        email,
        password,
        role
      });

      //bcrypt the password
      const salt = await bcryptjs.genSalt(10);
      user.dataValues.password = await bcryptjs.hash(password, salt);
      await User.create(user.dataValues);

      //jwt
      const payload={
        id:user.dataValues.id,
        name:user.dataValues.name,
        email:user.dataValues.email,
        role: user.dataValues.role
      }
      
      //Sign the token
      jwt.sign(payload,process.env.SECRETA,{
        expiresIn:'4h'
      },(error,token)=>{
        if (error) throw error;
        //Msg
        res.json({token});
      });

    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
};

module.exports = userController;
