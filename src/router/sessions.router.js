const Router = require('express').Router
const router=Router()
const crypto=require('crypto')
const passport=require("passport")
const usersModel=require("../dao/models/session.model.js")

router.get('/errorSignup',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error de registro'
    });
})

router.get('/errorLogin',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error Login'
    });
})

router.post('/signup',passport.authenticate("signup",{failureRedirect:"/api/sessions/errorSignup"}),async(req,res)=>{

    let {name, email, password}=req.body
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
    console.log(req.user)

    res.redirect(`/login?newUser=${email}`)
})

router.post('/login',passport.authenticate("login",{failureRedirect:"/api/sessions/errorLogin"}),async(req,res)=>{

   /* let {email, password}=req.body

    if(!email || !password) {
       // return res.send('Data incomplete')
       return res.redirect('/login?error=Faltan datos')
    }

    password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')

    let usuario=await usersModel.findOne({email, password})

    if(!usuario){
        //return res.status(401).send('Email or password incorrect')
        return res.redirect('/login?error=credenciales incorrectas')
    }*/
    
    console.log(req.user)

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

    req.session.usuario=req.user

    res.redirect('/products')
})

router.get('/github', passport.authenticate('github',{}),(req,res)=>{})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:'/api/sessions/errorGithub'}),(req,res)=>{
    
    res.setHeader('Content-Type','application/json')
    res.status(200).json({
        mensaje:'Login OK',
        usuario: req.user
    })
})

router.get('/errorGithub',(req,res)=>{
    
    res.setHeader('Content-Type','application/json')
    res.status(200).json({
        error:'Error en Github'
    })
})

router.get('/logout',(req,res)=>{

    req.session.destroy(e=>console.log(e))

    res.redirect("/login?mensaje=logout correcto...!!!")
})

module.exports=router