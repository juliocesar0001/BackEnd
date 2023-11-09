const  productsServices  = require("../../services/products.service.js")


async function postProducts( req , res ){
   
    const {title, description, code, price, status, stock, category} = req.body
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ error: 'Complete all required fields in the body' });
    }
   
    

    
    const newProduct = {
        title,
        description,
        code, 
        price, 
        status,
        stock,
        category,
        

          }

    await productsServices.createProduct(newProduct)
    
    res.status(201).json({ newProduct });




}


module.exports = postProducts