const express = require('express')
const productsRouter = require("./router/products.router.js")
const cartsRouter = require('./router/cart.router.js')
const vistasRouter = require("./router/vistas.router.js")
const sessionsRouter = require("./router/sessions.router.js")
const cookieParser=require("cookie-parser")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const ConnectMongo = require("connect-mongo")
const inicializaPassport = require("./config/passport.config.js")
const passport = require("passport")
const config=require("./config/config.js")

const messagesModelo = require("./dao/models/chat.modelo.js")
const realtimeprod = require("./router/realtimeproducts.router.js")
const s = require("socket.io").Server
const session = require("express-session")


const fs = require('fs')
const productManager = require("../src/productManager")

const app = express()
const PORT = config.PORT

const path = "../data/productos.json"
const pproductManager = new productManager(path)


app.engine("handlebars", handlebars.engine())
//app.engine("handlebars", handlebars.engine({ allowProtoMethodsByDefault: true, }))
app.set("view engine", "handlebars")
app.set("views", __dirname + "\\views")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    store: ConnectMongo.create({
        mongoUrl: "mongodb+srv://juliotico_01:elINFRAMUNDO@cluster0.ldltnhu.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce",
        ttl: 3600
    })
}))

inicializaPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use("/realtimeproducts", realtimeprod)
app.use("/", vistasRouter)
app.use('/api/sessions', sessionsRouter)

app.get('/chat', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('chat');
})

const serverExpress = app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`)
})

const conectar = async () => {
    try {
        await mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar()

let mensajes = [{
    emisor: "Servidor",
    mensaje: "Bienvenido"
}]

let usuarios = []
const io = new s(serverExpress)

io.on('connection', socket => {

    console.log(`Nueva conexion al socket: ${socket.id}`)

    socket.on('id', nombre => {

        usuarios.push({
            id: socket.id,
            nombre
        })

        socket.emit('Hola', mensajes)
        socket.broadcast.emit('New User: ', nombre)
    })

    socket.on('nuevoMensaje', mensaje => {
        mensajes.push(mensaje)
        messagesModelo.create({
            user: mensaje.emisor,
            message: mensaje.mensaje
        })
        io.emit('llegoMensaje', mensaje)
    })

    socket.on('disconnect', () => {
        console.log(`se desconecto el cliente con id ${socket.id}`)
        let indice = usuarios.findIndex(usuario => usuario.id === socket.id)
        let usuario = usuarios[indice]
        io.emit('usuarioDesconectado', usuario)
        console.log(usuario)
        usuarios.splice(indice, 1)
    })

})