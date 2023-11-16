const chatModel = require("../dao/models/chat.modelo.js")

async function chat( req , res ){
    
    res.status(200).render("chat")

}

module.exports = chat