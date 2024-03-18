const User = require('../models/user.model');

const validation = async (req, res, next) => {
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

module.exports = {
    validation
}