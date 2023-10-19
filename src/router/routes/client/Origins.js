const router = require('express').Router()
const OriginController = require('../../../database/controllers/OriginController')
const status = require('../../../functions/status')
const Origin = new OriginController()

router.route('/client/origins')
    .post(async (req, res) => {
        const {
            title,
            url
        } = req.body

        if (!req._username) return status.user_not_found

        Origin.Create(req._username, title, url)
            .then((result) => {
                res.json(result) 
            })
            .catch(() => {
                return status.server_error
            })
        })
    .put((req, res) => {

    })

module.exports = router