const User = require("../../models/User");
const status = require("../../../functions/status");

module.exports = async (owner, id) => {
    const userData = await User.findOne({
        username: owner,
    });

    if (!userData) {
        return status.user_not_found;
    }

    let allowedOrigins = userData.allowedOrigins || [];
    const checkOrigin = allowedOrigins.find((o) => o.id === id);

    if (!checkOrigin) {
        console.log("Origem não encontrado");
        return status.server_error;
    }

    allowedOrigins = allowedOrigins.filter((o) => o.id !== id);

    const result = await User.updateOne(
        {
            username: owner,
        },
        {
            allowedOrigins,
        }
    );

    if (result.modifiedCount > 0) {
        return {
            status: 200,
            message: "Origem deletada com sucesso!",
            db: result,
            newAllowedOrigins: allowedOrigins,
        };
    } else {
        console.log(result);
        return status.server_error;
    }
};
