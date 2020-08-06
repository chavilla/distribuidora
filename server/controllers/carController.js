const Car=require('../models/Car');
const User=require('../models/User');
const sequelize=require('../config/database');
const Product = require('../models/Product');
const shortid=require("shortid");

const carController={
    addProduct:async (req,res)=>{

        //Destructuing to the req.body
        const { userId, productId } = req.body;

        try{
            const id_to_car=shortid.generate();
            
            let car=new Car({
                id:id_to_car,
                userId,
                productId:parseInt(productId)
            });

            let carStored=await Car.create(car.dataValues);
            return res.json(carStored);

        }catch(error){
            return res.status(500).json(error);
        }
    },

    deleteProduct:async (req,res)=>{
        try {

            //Buscamos el registro del carrito por id
            const finder=await Car.findOne({
                    id:req.params.id
            });

            //eliminamos el registro
            await Car.destroy({where:{ id: finder.dataValues.id }});

            res.json({msg: 'Producto eliminado del carrito'});

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getProductCar:async (req,res)=>{
        try {
            const idUser=String(req.params.userId);
            const result=await sequelize.query(`SELECT c.id as idCar, c.userId,p.name, p.price, p.stock FROM cars c INNER JOIN products p ON p.id=c.productId INNER JOIN users u ON u.id=c.userId where c.userId='${idUser}'`);

            const rows=result[0];

            res.json(rows);

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports=carController;