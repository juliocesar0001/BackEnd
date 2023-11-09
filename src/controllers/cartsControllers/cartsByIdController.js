const cartsService = require("../../services/carts.service.js")



async function cartById( req , res ){

    const id = req.params.pid
      
    const productById = await cartsService.cartsById(id)
    if(productById){
      
      
      res.status(200).send(productById)


    }
    else(

      res.status(400).send({error:"id no encontrado"})

    )



}

module.exports = cartById