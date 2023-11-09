async function deleteCookiesSession( req , res ){


    req.user = null

    res.clearCookie("datos")
    if(res.clearCookie("datos")){console.log("cookie datos destruida archivo views.router.js:95")}

    res.clearCookie("current")
    if(res.clearCookie("current")){console.log("cookie current destruida archivo views.router linea 86")}
    
    res.clearCookie("token")
    if(res.clearCookie("token")){console.log("cookie token destruida archivo views.router linea 81")}
    
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
      } else {
        console.log("Sesión de usuario destruida con éxito views.router linea 86");
        
        res.redirect("/api/sessions/login");
      }
    });


}

module.exports = deleteCookiesSession