const Sale=require('../models/Sale');
const shorId=require('shortid');
const saleController={

    addSale:async (req,res)=>{
        const { products,userId,total }=req.body;

        try {

            //Se genera un id
            const id=shorId.generate();

            const sale=new Sale({
                id,
                products,
                userId,
                total
            });

            const saleStored=await Sale.create(sale.dataValues);

            res.json(saleStored);
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

}


module.exports=saleController;