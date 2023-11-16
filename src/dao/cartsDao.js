const cartsModelo = require("../dao/models/carts.modelo.js")

class cartsMongoDao{

      constructor(){}

      async getCarts(){
        return await cartsModelo.find()
      }

      async create(newCart){

       return await cartsModelo.create(newCart)

      }

      async cartsById( id ){

      return await cartsModelo.findById({ _id : id })
    
    
     } 
     async updateQuantity( cartId , productoId , quantity ){

      return await cartsModelo.updateOne({ _id : cartId , "products.product" : productoId},{$inc:{"products.$.quantity": quantity}})
     
     }

     async deleteCartProduct( carritoId , productId ){

      return await cartsModelo.updateOne( { _id : carritoId } , {$pull : {products : {product : productId} } } )

     }

     async cartDelete( id ){

      return await cartsModelo.deleteOne({ _id : id })

     }
}

module.exports = cartsMongoDao