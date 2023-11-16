const productsModelo = require("../dao/models/products.modelo.js")

class productsMongoDao {

  constructor() {

  }

  async get(filtro = {}) {
    return await productsModelo.find(filtro)
  }

  async create(product) {

    return await productsModelo.create(product)

  }

  async put(id, productToUpdate) {

    return await productsModelo.updateOne({
      _id: id
    }, productToUpdate)

  }

  async productById(id) {

    return await productsModelo.findOne({
      "_id ": id
    }).select("-_id")

  }

  async delete(id) {

    return await productsModelo.deleteOne({
      _id: id
    })
  }

  async sortPrice(sort) {

    return await productsModelo.aggregate([{
      $sort: {
        price: sort
      }
    }])
  }

  async productsByLimit(limit) {

    return await productsModelo.find().limit(limit).lean()

  }

  async products_Paginate(pagina, limite) {

    return await productsModelo.paginate({}, {
      limit: limite,
      lean: true,
      page: pagina
    })

  }

  async productsByStatus(status) {

    return await productsModelo.find({
      status: status
    }).lean()

  }

  async productsByCategory(category) {

    return await productsModelo.find({
      category
    }).lean()

  }
}

module.exports = productsMongoDao