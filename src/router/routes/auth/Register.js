const router = require('express').Router()
const UserController = require('../../../database/controllers/UserController')
const User = new UserController()

router.post('/auth/register', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body

    try {
        const result = await User.Create(username, email, password)
        console.log(result)
        res.json(result)
    } catch {
        res.json({
            status: 500,
            error: "Erro no servidor!"
        })
    }
})

module.exports = router