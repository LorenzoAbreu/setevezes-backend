const jwt = require("../functions/jwt");
const status = require("../functions/status");
const UserController = require("../database/controllers/UserController");

module.exports = async function AdminAuthentication(req, res, next) {
    const Authorization = req.headers.authorization;
    const user = new UserController();
    console.log("AdmAuth");
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

            if (checkUser.admin != true) {
                return res.json(status.user_have_not_permission);
            }

            if (checkUser.approved != true) {
                return res.json(status.user_not_approved);
            }

            next();
        } else {
            return res.json(status.user_have_not_permission);
        }
    } else {
        return res.json(status.token_not_found);
    }
};
