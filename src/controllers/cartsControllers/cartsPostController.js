const cartsService = require("../../services/carts.service.js")


async function cartCreate( req , res){

    const newCart = req.body
    const insertCart = await cartsService.createCart(newCart)
 
    if(insertCart){
 
       res.status(200).send("Producto Añadido")
    }
     else{
        
       res.status(400).send("error al crear producto")
        
     }
 

     
}

module.exports = cartCreate