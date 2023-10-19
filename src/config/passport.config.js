const passport = require("passport")
const local = require("passport-local")
const crypto = require("crypto")
const usersModel = require("../dao/models/session.model.js")
const github = require("passport-github2")
const validaHash = require("../utils.js")
const generaHash = require("../utils.js")
const {
    hashSync
} = require("bcrypt")


const inicializaPassport = () => {

    // estrategias
    passport.use('github', new github.Strategy({
            clientID: 'Iv1.6ddff38cbda86aca',
            clientSecret: '65b2482876964e4bc4ed4ec96892739ddcd5aa8c',
            callbackURL: 'http://localhost:8080/api/sessions/callbackGithub'
        },
        async (token, tokenRefresh, profile, done) => {
            try {
                console.log(profile)
                let usuario = await usersModel.findOne({
                    email: profile._json.email
                })
                if (!usuario) {
                    usuario = await usersModel.create({
                        name: profile._json.name,
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

    passport.use("signup", new local.Strategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        async (req, username, done) => {
            //try {

            /* // logica de registro
                const {name, email, password}=req.body

                if (!name || !email || !password) {
                    //return res.status(400).send('Data incomplete')
                    done(null, false)
                }

                let existe = await usersModel.findOne({email:email})
                if (existe) {
                    // return res.status(400).send(`User already exist: ${email}`)
                    done(null, false)
                }

                //password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')

                let usuario = await usersModel.create({
                    name, email, 
                    password: generaHash(password)
                })

                console.log('pasando x passport registro...!!!')

                if(usuario){
                    console.log("pasoooo")
                     res.status(200).redirect("/api/sessions/login")
             
                  }else{
             
                     res.status(400).send("no es posible crear este usuario")
                  }
                //done(null, usuario)
*/
            /*
                        } catch (error) {
                            done(error)
                        }
                    }*/
        }))


    passport.use('login', new local.Strategy({
            usernameField: 'email'
        },
        async (username, password, done) => {
            /*   try {
                if(!username || !password) {
                    // return res.send('faltan datos')
                    // return res.redirect('/login?error=Faltan datos')
                    return done(null, false)
                }
            
                // password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')
            
                // let usuario=await modeloUsuarios.findOne({email:username, password:password})
                let usuario=await usersModel.findOne({email:username})
                if(!usuario){
                    // return res.status(401).send('credenciales incorrectas')
                    // return res.redirect('/login?error=credenciales incorrectas')
                    return done(null, false)
                }else{
                    if(!validaHash(usuario, password)){
                        // clave invalida
                        return done(null, false)
                    }
                }

                usuario={
                    nombre: usuario.nombre, 
                    email: usuario.email, 
                    _id: usuario._id
                }

                return done(null, usuario)
            
            } catch (error) {
                // done(error, null)
                return done(error)
            }
        */
        }
    ))


    passport.serializeUser((ususario, done) => {
        done(null, ususario._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario = await usersModel.findById(id)
        return done(null, usuario)
    })

} // fin de inicializaPassport

module.exports = inicializaPassport