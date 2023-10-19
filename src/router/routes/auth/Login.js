const router = require('express').Router()
const UserController = require('../../../database/controllers/UserController')
const User = new UserController()
const status = require('../../../functions/status')

router.post('/auth/login', async (req, res) => {
    const {
        username,
        password
    } = req.body

    try {
        const result = await User.Login(username, password)
        res.json(result)
    } catch {
        res.json(status.server_error)
    }
})

module.exports = router