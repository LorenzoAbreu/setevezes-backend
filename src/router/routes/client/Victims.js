const router = require('express').Router()
const VictimController = require('../../../database/controllers/VictimController')
const victim = new VictimController()
const AuthController = require('../../../database/controllers/AuthController')
const Auth = new AuthController()
const status = require('../../../functions/status')

router.post('/client/victims/create', async (req, res) => {

    const {
        action
    } = req.params

    const body = req.body

    if (action == 'set') {
        try {
            const result = await victim.Create(req._username, body)
            res.json(result)
        } catch {
            return res.json(status.server_error)
        }
    }
})

module.exports = router