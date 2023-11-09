const bcrypt = require("bcrypt")
const usersService = require("../../services/users.service.js")


async function register( req , res ){

     
    const { nombre , apellido ,  email , password } = req.body
    let { edad } = req.body
    
   



    if( !nombre || !email || !password || !apellido  || !edad ){

        res.status(400).send("complete todos los campos")
        
    }else{
     const emailVerification = await usersService.verifyEmailUser(email)
    
     if(emailVerification){

        res.status(400).send("usuario con ese email ya existe")

     }else{

        let hash = await bcrypt.hash( password , 10 )
        
        edad = parseInt(edad)
        const userCreate = await usersService.createUser({ nombre , apellido , edad , email , hash })
     
        if(userCreate){
   
           res.status(200).redirect("/api/sessions/login")
   
        }else{
   
           res.status(400).send("no es posible crear este usuario")
        }
}
}

}

module.exports = register