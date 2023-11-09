const {generaJWT} = require("../../utils.js")

async function githubLogin( req , res){

    const token = generaJWT(req.user._id)
    if(token){ 
    
    
    res.cookie( "token", token , { httpOnly : false } )
    
    
    //agregamos a la session en caso de que no haya un registro con github
    }

    res.status(200).redirect("/api/products")
    console.log("holaa")



}

module.exports = githubLogin