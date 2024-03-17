const express = require('express');
const router = express.Router()
const User = require('../models/user.model')

//MIDDLEWARE
const getUser = async (req, res, next) => {
    let user;
    const {id} = req.params

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message: 'El ID del item no es valido'
        })
    }

    try {
        user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message : 'El usuario no fue encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
    res.user = user;
    next();
}

//Obtener todos los usuarios
router.get('/', async (req, res) => {
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
})

//Crear un nuevo usuario

router.post('/', async(req, res) => {
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
})

//Buscar por id
router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})

//Cambiar datos por id
router.put('/:id', getUser, async (req, res) => {
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
})

module.exports = router

