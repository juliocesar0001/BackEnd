const usersService = require("../../services/users.service.js")
const { generaJWT } = require("../../utils.js")
const bcrypt = require("bcrypt")


async function login( req , res ){
    
    const { email , password } = req.body

  


    if(!email || !password){
 
      res.status(400).send("complete todos los campos")
 
 
   }else{
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
 
             res.status(200).redirect("/api/products")
 
       }else{ 
 
             const user = await usersService.verifyEmailUser(email)
             if(!user){
    
               res.status(400).send({message:"usuario no encontrado"})
                      }
            else{ 
 
               let uncryptPassword = await bcrypt.compare( password , user.password ) 
               if(!uncryptPassword){ 
      
                  res.status(400).send("usuario no existente")
         
         
         
              }else{/*generamos un token a partir de los datos del ususario, es decir, le damos el ususario (user) para crear el token y q lo firme,
                    el token es basicamente los datos q le pasamos codificados en base64, y luego
                    en verifyToken lo q hacemos es pasarle el mismo token el cual almacenamos en cookies.token y ahi la funcion verifica el token junto cn la firma
                    la cual es uno de los argumentos de la funcion y si el codigo reconoce q el creo el token,lo decodifica si tiene bien la firma
                    entre otras cosas que debe de tener la libreria,  te devuelve las credenciales a las cuales estan asociadas
                    ese token, es decir, la info decodificada*/
                    const token = generaJWT(user)
                    if(token){ 
            
            
                         res.cookie( "token", token , { httpOnly : false } )
            
            
            //agregamos a la session en caso de que no haya un registro con github
                         let datos = { nombre : user.nombre , email : email }
                         res.cookie("datos", datos , { httpOnly : false })
                         res.status(200).redirect("/api/products")
                             }
           
          
         
          }
        }}
     }


}

module.exports = login