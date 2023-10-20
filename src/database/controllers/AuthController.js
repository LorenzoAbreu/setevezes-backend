const jwt = require('../../functions/jwt')
const User = require('../models/User')
const status = require('../../functions/status')

module.exports = class AuthController {
    async ApiKeyAuthentication (req, res, next) {
        const { key: apiKey } = req.query

        const checkApiKey = await User.findOne({
            apiKey
        })

        if (!apiKey || !checkApiKey) {
            console.log(apiKey)
            console.log(checkApiKey)
            return res.json(status.invalid_apikey)
        }

        req._username = checkApiKey.username

        next()
    }

    async Authentication (req, res, next) {
        const Authorization = req.headers.authorization
        
        if (Authorization && Authorization.startsWith('Bearer ')) {
            const token = Authorization.split('Bearer ')[1]

            const tokenData = await jwt.verify(token)

            if (tokenData){
                const checkUser = await User.findOne({
                    username: tokenData.username
                })

                if (!checkUser) {
                    return res.json(status.user_not_found)
                }

                if (checkUser.approved != true) {
                    return res.json(status.user_not_approved)
                }

                req._username = checkUser.username

                next()
            } else {
                return res.json(status.invalid_token)
            }

        } else {
            return res.json(status.token_not_found)
        }
    }

    async AdminAuthentication (req, res, next) {
        const Authorization = req.headers.authorization
        
        if (Authorization && Authorization.startsWith('Bearer ')) {
            const token = Authorization.split('Bearer ')[1]
            const tokenData = await jwt.verify(token)

            if (tokenData){
                const checkUser = await User.findOne({
                    username: tokenData.username
                })

                if (!checkUser) {
                    return res.json(status.user_not_found)
                }

                if (checkUser.admin != true) {
                    return res.json(status.user_have_not_permission)  
                }

                if (checkUser.approved != true) {
                    return res.json(status.user_not_approved)
                }

                next()
            } else {
                return res.json(status.user_have_not_permission)
            }

        } else {
            return res.json(status.token_not_found)
        }
    }

    async getTokenData(req) {
        const Authorization = req.headers.authorization
        
        if (Authorization && Authorization.startsWith('Bearer ')) {
            const token = Authorization.split('Bearer ')[1]
            try {
                return await jwt.verify(token)
            } catch {
                return false
            }
        }
    }
}