async function errGithub( req , res ){

    res.status(200).send({"error":"fallo al autenticar"})

}

module.exports = errGithub