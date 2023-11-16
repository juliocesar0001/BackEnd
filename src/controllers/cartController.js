const cartsService = require("../services/carts.service.js")


async function cartDelete(req, res) {

   const id = req.params.cid
   const cartDelete = await cartsService.cartDelete(id)
   if (cartDelete) {
      res.status(200).send("cart deleted")

   } else {

      res.status(400).send("failed to delete cart")

   }
}


async function cartProductDelete(req, res) {

   const carritoId = req.params.cid
   const productId = req.params.pid

   if (carritoId && productId) {
      const carrito = await cartsService.deleteCartProduct(carritoId, productId)
      res.status(200).send("yess you did it¡")

   } else {
      res.status(400).send("failed to delete product")
   }

}

async function cartUpdate(req, res) {

   const cartId = req.params.cid
   const productoId = req.params.pid
   const quantity = parseInt(req.body.quantity)
   console.log(quantity)

   if (!quantity && productoId === 0 && cartId === 0) {

      res.status(400).send({
         error: "invalid data"
      })

   } else {

      const updateProductQuantity = await cartsService.updateQuantity(cartId, productoId, quantity)
      if (updateProductQuantity) {

         res.status(200).send("Cantidad actualizada correctamente")

      } else {
         res.status(400).send("error")
      }
   }
}


async function cartById(req, res) {

   const id = req.params.pid

   const productById = await cartsService.cartsById(id)
   if (productById) {

      res.status(200).send(productById)

   } else(

      res.status(400).send({
         error: "id no encontrado"
      })

   )
}

async function getCarts(req, res) {

   const products = await cartsService.getCarts()
   res.status(200).send(products)

}


async function cartCreate(req, res) {

   const newCart = req.body
   const insertCart = await cartsService.createCart(newCart)

   if (insertCart) {

      res.status(200).send("Producto Añadido")
   } else {

      res.status(400).send("error al crear producto")

   }
}

module.exports = cartDelete,cartCreate,getCarts,cartById,cartUpdate,cartProductDelete