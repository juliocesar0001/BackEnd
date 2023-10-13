const passport=require("passport")
const usersModel=require("../dao/models/session.model.js")
const github=require("passport-github2")
const local=require("passport-local")
const crypto=require=("crypto")



const inicializaPassport=()=>{

    passport.use("signup", new local.Strategy(
        {
            usernameField:'email', passReqToCallback:true
        },
        async(req, username, password, done)=>{
            try {

                // logica de registro
                let {name, email, password}=req.body

                if(!name || !email || !password){
                    //return res.status(400).send('Data incomplete')
                    done(null, false)
                }  

                let existe=await usersModel.findOne({email})
                if(existe){
                   // return res.status(400).send(`User already exist: ${email}`)
                   done(null, false)
                }
            
                //password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')
            
                let usuario=await usersModel.create({
                    nombre, email, password
                })

                console.log('pasando x passport registro...!!!')

                done(null, usuario)
            
            } catch (error) {
                done(error)
            }
        }
    ))


    passport.use('login', new local.Strategy(
    {
        usernameField:"email"
    },async(email,password,done)=>{
        try{
            if(!email || !password) {
                // return res.send('Data incomplete')
                //return res.redirect('/login?error=Faltan datos')
            return done(null,false) 
            }
         
            //password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')
         
            //let usuario=await usersModel.findOne({email:email, password:password})
            let usuario=await modeloUsuarios.findOne({email:email})
             if(!usuario){
                //return res.status(401).send('Email or password incorrect')
                //return res.redirect('/login?error=credenciales incorrectas')
            return done(null,false) 
            }else{
                if(!validaHash(usuario, password)){
                    // clave invalida
                    return done(null, false)
                }
            }

            usuario={
                nombre:usuario.nombre,
                email:usuario.email,
                _id:usuario._id
            }
            
            return done(null,usuario)
        }catch(error){
            return done(error)
        }
    }
    ))

     // estrategias
     passport.use('github', new github.Strategy(
        {
            clientID: "Iv1.6ddff38cbda86aca", 
            clientSecret: "65b2482876964e4bc4ed4ec96892739ddcd5aa8c",
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub"
        },
        async(token, tokenRefresh, profile, done)=>{
            try {
                console.log(profile)
                let usuario=await usuariosModelo.findOne({email:profile._json.email})
                if(!usuario){
                    usuario=await usuariosModelo.create({
                        nombre: profile._json.name,
                        email: profile._json.email,
                        github: profile
                    })
                }

                done(null, usuario)


            } catch (error) {
                return done(error)
            }
        }
    ))



    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usersModel.findById(id)
        return done(null, usuario)
    })

} // fin de inicializaPassport

module.export=inicializaPassport