const User = require('../../../database/models/User')
const status = require('../../../functions/status')

const router = require('express').Router()
const UserController = require('../../../database/controllers/UserController')
const user = new UserController()

router.route('/admin/user/:username')
    .put(async (req, res) => {
        const result = await user.Edit(req.params.username, req.body)
        res.json(result)
    })

module.exports = router