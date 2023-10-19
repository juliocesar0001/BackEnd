const Router = require('express').Router
const crypto = require('crypto')
const router = Router()
const usersModel = require("../dao/models/session.model.js")
const passport = require("passport")
const validaHash = require("../utils.js")
const bcrypt = require("bcrypt")

router.get('/errorSignup', (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        error: 'Error de registro'
    });
})

router.post('/signup', async (req, res) => {
    /*
            if(!name || !email || !password){
                return res.status(400).send('Data incomplete')
            }
        
            let existe=await usersModel.findOne({email})
            if(existe){
                return res.status(400).send(`User already exist: ${email}`)
            }
        
            password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')
        
            await usersModel.create({
                name, email, password
            })
            */

    /*console.log(req.user)

    res.redirect(`/login?usuarioCreado=${email}`)*/
    const {
        name,
        email,
        password
    } = req.body

    if (!name || !email || !password) {

        res.status(400).send("complete todos los campos")

    } else {
        const emailVerification = await usersModel.findOne({
            email: email
        })

        if (emailVerification) {

            res.status(400).send("usuario con ese email ya existe")

        } else {

            let hash = validaHash

            const userCreate = await usersModel.create({
                name,
                email,
                password: hash
            })

            if (userCreate) {
                res.status(200).redirect(`/login?usuarioCreado=${email}`)
            } else {
                res.status(400).send("no es posible crear este usuario")
            }
        }
    }
})

router.post('/login', async (req, res) => {
    /*if(!email || !password) {
            // return res.send('Data incomplete')
            return res.redirect('/login?error=Faltan datos')
         }
     
         password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')
     
         let usuario=await usersModel.findOne({email, password})
     
         if(!usuario){
             //return res.status(401).send('Email or password incorrect')
             return res.redirect('/login?error=credenciales incorrectas')
         }*/

    //console.log(req.user)

    /*
        if (usuario.email === "adminCoder@coder.com"){
            req.session.usuario={
                name: usuario.name,
                email: usuario.email,
                rol: "admin"
            }
        }
        else{
            req.session.usuario={
                name: usuario.name,
                email: usuario.email,
                rol: "user"
            }
        }*/
    /*
            req.session.usuario=req.user

            res.redirect('/products')*/
    const {
        email,
        password
    } = req.body

    if (!email || !password) {

        res.status(400).send("complete todos los campos")

    } else {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {

            res.status(200).redirect("/api/products")

        } else {

            const user = await usersModel.findOne({
                email: email
            })

            let uncryptPassword = validaHash

            if (uncryptPassword) {

                req.session.nombre = user.nombre
                req.session.email = email

                console.log(req.session.nombre + req.session.email)
                res.status(200).redirect("/api/products")
            } else {
                res.status(400).send("usuario no existente")
            }
        }
    }
})


router.get('/logout', (req, res) => {

    req.session.destroy(e => console.log(e))

    res.redirect('/login?mensaje=logout correcto...!!!')

})

router.get('/errorLogin', (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        error: 'Error Login'
    })
})


router.get('/github', passport.authenticate('github', {}), (req, res) => {})

router.get('/callbackGithub', passport.authenticate('github', {
    failureRedirect: '/api/sessions/errorGithub'
}), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Login OK',
        usuario: req.user
    })
})

router.get('/errorGithub', (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        error: 'Error en Github'
    })
})

module.exports = router