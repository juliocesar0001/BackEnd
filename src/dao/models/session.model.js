const mongoose=require('mongoose')

const usersModel=mongoose.model('usuarios', new mongoose.Schema({
    name: String,
    email: {
        type: String, unique: true
    },
    password: String,
    github:{}
}))

module.exports=usersModel