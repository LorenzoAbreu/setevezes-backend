const router = require('express').Router()
const AuthController = require('../database/controllers/AuthController')
const auth = new AuthController()

router.all('/', (req, res) => {
    res.send('Oi')
})

const importRoute = (FileName) => {
    let fileName = FileName

    if (fileName.startsWith('/')) {
        fileName = fileName.replace('/', '')
    }

    fileName = fileName.replace('.js', '')

    return require('./routes/'+fileName+'.js')
}

router.all(
    '/admin/user/:username', 
    auth.AdminAuthentication, 
    importRoute('/admin/User.js')
)

router.all(
    '/client/origins', 
    auth.Authentication, 
    importRoute('/client/Origins.js')
)

router.all(
    '/client/victims', 
    auth.ApiKeyAuthentication, 
    importRoute('/client/Victims.js')
)

router.all(
    '/auth/login',
    importRoute('/auth/Login.js')
)

router.all(
    '/auth/register',
    importRoute('/auth/Register.js')
)

router.all('*', (req, res) => {
    res.send({
        status: 404
    })
})

module.exports = router