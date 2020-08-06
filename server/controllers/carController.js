const Car=require('../models/Car');
const Product = require('../models/Product');

const carController={
    addProduct:async (req,res)=>{

        try{
            let car=new Car(req.body);
            const { id, userId, productId }=car.dataValues;
            let carStored=await Car.create({
                id,
                userId,
                productId: parseInt(productId)
            });
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

            let car=await Car.findAll({
                include:[{
                    model:'user'
                }]
            });

            res.json({car});

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports=carController;