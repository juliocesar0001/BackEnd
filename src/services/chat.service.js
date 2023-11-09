const chatDao = require("../dao/chatDao.js")

class chatService{

   constructor(dao){
      this.dao = new dao()

   }

   async getChat(){

     return await this.dao.getChat()

   }

   async addMessage(nuevoMensaje){

     return await this.dao.addMessage(nuevoMensaje)

   }

}

module.exports = new chatService(chatDao)