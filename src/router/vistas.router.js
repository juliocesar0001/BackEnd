const Router = require('express').Router
const router = Router()

const auth = (req, res, next) => {
    if (req.session.usuario) {
        next()
    } else {
        return res.redirect('/login')
    }
}

const auth2 = (req, res, next) => {
    if (req.session.usuario) {
        console.log('auth2 me manda a perfil')

        return res.redirect('/products')
    } else {
        next()
    }
}

router.get('/', (req, res) => {
    let verLogin = true
    if (req.session.usuario) {
        verLogin = false
    }
    res.status(200).render('home', {
        verLogin
    })
})

router.get('/signup', auth2, (req, res) => {
    let error = false
    let errorDetalle = ''
    if (req.query.error) {
        error = true
        errorDetalle = req.query.error
    }

    res.status(200).render('signup', {
        verLogin: true,
        error,
        errorDetalle
    })
})

router.get('/chat', auth, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('chat');
})

router.get('/login', auth2, (req, res) => {
    let error = false
    let errorDetalle = ''
    if (req.query.error) {
        error = true
        errorDetalle = req.query.error
    }
    let usuarioCreado = false
    let usuarioCreadoDetalle = ''
    if (req.query.usuarioCreado) {
        usuarioCreado = true
        usuarioCreadoDetalle = req.query.usuarioCreado
    }

    res.status(200).render('login', {
        verLogin: true,
        usuarioCreado,
        usuarioCreadoDetalle,
        error,
        errorDetalle
    })
})

router.get('/products', auth, (req, res) => {
    res.status(200).render('products', {
        verLogin: false,
        usuario: req.session.usuario
    })
})





module.exports = router