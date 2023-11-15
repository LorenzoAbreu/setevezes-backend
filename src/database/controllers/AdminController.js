const User = require("../models/User");

module.exports = class AdminController {
    async getUserById(userId) {
        const checkUser = await User.findOne({
            id: userId,
        });

        if (checkUser) {
            return {
                status: 200,
                userData: checkUser,
            };
        } else {
            return {
                status: 404,
                error: "Usuário não encontrado.",
            };
        }
    }
};
