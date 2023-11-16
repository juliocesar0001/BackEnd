const cartsMongoDao = require("../dao/cartsDao.js")

class cartsService {

   constructor(dao) {

      this.dao = new dao()

   }

   async getCarts() {

      return await this.dao.getCarts()

   }

   async createCart(newCart) {

      return await this.dao.create(newCart)

   }

   async cartsById(id) {

      return await this.dao.cartsById(id)

   }
   async updateQuantity(cartId, productoId, quantity) {

      return await this.dao.updateQuantity(cartId, productoId, quantity)

   }

   async deleteCartProduct(carritoId, productId) {

      return await this.dao.deleteCartProduct(carritoId, productId)

   }

   async cartDelete(id) {

      return await this.dao.cartDelete(id)
   }
}

module.exports = new cartsService(cartsMongoDao)