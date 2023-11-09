async function registerView( req , res ){
  res.status(200).render("register")
}

module.exports = registerView