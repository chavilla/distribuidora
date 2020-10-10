const Car=require('../models/Car');
const User=require('../models/User');
const sequelize=require('../config/database');
const Product = require('../models/Product');
const shortid=require("shortid");

const carController={

    addProduct:async (req,res)=>{
        //Destructuing to the req.body
        const userId=req.body.userId;
        const productId=parseInt(req.body.productId);

        try{

            const result=await Car.findOne({ where:{ productId, userId }});
    
            if (result){
                return res.status(401).json({msg: "Este producto ya está agregado a tu carrito."});
            }

            const id_to_car=shortid.generate();
            
            let car=new Car({
                id:id_to_car,
                userId,
                productId
            });

            let carStored=await Car.create(car.dataValues);
            res.json({msg: "Añadido al carrito"});

        }catch(error){
            return res.status(500).json(error);
        }
    },

    deleteProduct:async (req,res)=>{
        try {

            console.log(req); return;

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
            const result=await sequelize.query(`SELECT c.id as idCar, c.userId, c.productId, p.name, p.price, p.image, p.stock FROM cars c INNER JOIN products p ON p.id=c.productId INNER JOIN users u ON u.id=c.userId where c.userId='${idUser}'`);

            const products_car=result[0];

            res.json({products_car});

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports=carController;