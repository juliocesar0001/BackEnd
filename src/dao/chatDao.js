const chatModelo = require("../dao/models/chat.modelo.js")

class chatDao{

    constructor(){}

    async getChat(){

      return await chatModelo.find().lean()
    
    }

    async addMessage(nuevoMensaje){

      return await chatModelo.create(nuevoMensaje)

    }

}


module.exports = chatDao