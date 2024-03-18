const User = require('../models/user.model');

const getAll = async function (req, res){
    try {
        const users = await User.find()
        console.log("GET all", users)
        if(users.length == 0){
            return res.status(204).json([])
        }
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async(req, res) => {
    const { name,lastName, codigo, email, password } = req?.body
    if(!name || !lastName || !codigo || !email || !password){
        return res.status(400).json({
            message: "Los campos son obligatorios"
        })
    }

    const user = new User(
        {
            name,
            lastName,
            codigo,
            email,
            password
        }
    )

    try {
        const newUser = await user.save()
        console.log(newUser)
        res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


const updateUser = async function (req, res) {
    try {
        const user = res.user
        user.name = req.body.name || user.name
        user.lastName = req.body.lastName || user.lastName
        user.codigo = req.body.codigo || user.codigo
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password

        const updateUser = await user.save()
        res.json(updateUser)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const searchUsers = async (req, res) => {
    res.json(res.user)
}

const deleteUsers = async (req, res) => {
    const userId = req.params.id

    try {
        const deleteUsers = await User.findByIdAndDelete(userId)

        if(!deleteUsers){
            return res.status(404).json({message: 'User not found'})
        }
        res.json({message: 'User deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAll,
    createUser,
    updateUser,
    searchUsers,
    deleteUsers
}
