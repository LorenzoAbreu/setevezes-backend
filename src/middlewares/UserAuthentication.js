const jwt = require("../functions/jwt");
const status = require("../functions/status");
const UserController = require("../database/controllers/UserController");

module.exports = async function Authentication(req, res, next) {
    const Authorization = req.headers.authorization;
    const user = new UserController();

    if (Authorization && Authorization.startsWith("Bearer ")) {
        const token = Authorization.split("Bearer ")[1];

        const tokenData = await jwt.verify(token);

        if (tokenData) {
            const checkUser = await user.get({
                username: tokenData.username,
            });

            if (!checkUser) {
                return res.json(status.user_not_found);
            }

            if (checkUser.approved != true) {
                return res.json(status.user_not_approved);
            }

            req._username = checkUser.username;

            next();
        } else {
            return res.json(status.invalid_token);
        }
    } else {
        return res.json(status.token_not_found);
    }
};
