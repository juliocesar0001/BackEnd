const  productsMongoDao  = require("../dao/productsDao.js")

class productsService{
    constructor(dao){
        this.dao = new dao()
    }
    async getProducts(){

        return await this.dao.get()
    }
    async createProduct(product){
        
        return await this.dao.create(product)
     }
    async updateProduct(id , product){

        return await this.dao.put(id , product)

    }
    async productById( id ){

       return await this.dao.productById(id)

    }

    async deleteProduct(id){

      return await this.dao.delete(id)

    }
    async sortPrice(sort){
   
      return await this.dao.sortPrice(sort)      
    
    }

    async productByLimit(limit){

     return await this.dao.productsByLimit(limit)

    }

    async products_Paginate( pagina , limite ){

    return await this.dao.products_Paginate( pagina , limite )

    }

    async productsByStatus( status ){

    return await this.dao.productsByStatus( status )
    }
    async productsByCategory( category ){

    return await this.dao.productsByCategory( category )

    }
   
}
    


module.exports = new productsService(productsMongoDao)