const productsService = require("../../services/products.service.js")

async function productById( req , res ){

    const id = req.params.pid
    const products = await productsService.productById(id)
    
    if(products){ 
      
      res.status(200).send(products)
    
    }else{

      res.status(400).send("Producto id " + id + " no encontrado")

    }
}

module.exports = productById