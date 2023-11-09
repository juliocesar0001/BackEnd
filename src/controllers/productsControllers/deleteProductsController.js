const productsService = require("../../services/products.service.js")



async function deleteProduct( req , res ){

    const id = req.params.pid
    const productDeleted = await productsService.deleteProduct(id)
    if(productDeleted){

     
      res.status(200).send("Producto id: " + id + "eliminado correctamente")
       

    }
    else{

      res.status(400).send("Producto id: " + id + "no existe")
     


    }




}




module.exports = deleteProduct