async function loginView( req , res ){

    res.status(200).render("login")
}

module.exports = loginView