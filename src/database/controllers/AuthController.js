const jwt = require("../../functions/jwt");

module.exports = class AuthController {
    async getTokenData(req) {
        const Authorization = req.headers.authorization;

        if (Authorization && Authorization.startsWith("Bearer ")) {
            const token = Authorization.split("Bearer ")[1];
            try {
                return await jwt.verify(token);
            } catch {
                return false;
            }
        }
    }
};
