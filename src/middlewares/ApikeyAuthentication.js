const jwt = require("../functions/jwt");
const status = require("../functions/status");
const UserController = require("../database/controllers/UserController");

module.exports = async function ApiKeyAuthentication(req, res, next) {
    const { key: apiKey } = req.query;
    const user = new UserController();

    const checkApiKey = await user.get({
        apiKey,
    });

    if (!apiKey || !checkApiKey) {
        console.log(apiKey);
        console.log(checkApiKey);
        return res.json(status.invalid_apikey);
    }

    req._username = checkApiKey.username;

    next();
};
