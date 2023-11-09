const cartsService = require("../../services/carts.service.js")



async function cartProductDelete( req , res ){

    const carritoId = req.params.cid
    const productId = req.params.pid
 
    if(carritoId && productId){
 
 
      const carrito = await cartsService.deleteCartProduct( carritoId , productId )
      res.status(200).send("yess you did it¡")
 
    }
    else{res.status(400).send("failed to delete product")}
 
 


}

module.exports = cartProductDelete