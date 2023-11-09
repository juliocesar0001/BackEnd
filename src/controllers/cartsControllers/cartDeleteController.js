const cartsService = require("../../services/carts.service.js")


async function cartDelete( req , res ){


    const id = req.params.cid
    const cartDelete = await cartsService.cartDelete(id)
    if ( cartDelete ){
       res.status(200).send("cart deleted")
       
    }
    else{
 
       res.status(400).send("failed to delete cart")
 
 
    }


}



module.exports = cartDelete