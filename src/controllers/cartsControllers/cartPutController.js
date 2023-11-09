const cartsService = require("../../services/carts.service.js")



async function cartUpdate( req , res ){


    const cartId = req.params.cid
    const productoId = req.params.pid
    const quantity = parseInt(req.body.quantity)
    console.log(quantity)

    if(!quantity && productoId === 0 && cartId === 0){

       res.status(400).send({error:"invalid data"})

    }else{
       
      const updateProductQuantity = await cartsService.updateQuantity( cartId , productoId , quantity)
      if(updateProductQuantity){

          res.status(200).send("Cantidad actualizada correctamente")

         }
         
         else{
            res.status(400).send("error")
         }
     }    



}

module.exports = cartUpdate