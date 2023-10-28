const verifyUrl = require("../../../functions/verifyUrl");
const status = require("../../../functions/status");
const User = require("../../models/User");
const getHostname = require("../../../functions/getHostname");

module.exports = async (owner, title, url, options) => {
    const userData = await User.findOne({
        username: owner,
    });

    if (!userData) {
        return status.user_not_found;
    }

    if (!title || !url) {
        return status.fill_all_fields;
    }

    const urlStatus = await verifyUrl(url);

    if (urlStatus !== true) {
        return urlStatus;
    }

    let hostname = getHostname(url);

    let allowedOrigins = userData.allowedOrigins || [];

    const checkTitle = allowedOrigins.find((o) => o.title === title);
    if (checkTitle) return status.sitename_already_been_used_by_you;

    const checkUrl = allowedOrigins.find((o) => o.url === url);
    if (checkUrl) return status.url_already_been_created;

    function genRandNumber() {
        return Math.floor(Math.random() * 999999);
    }

    const newId =
        "t" + genRandNumber() + "d" + genRandNumber() + "7" + genRandNumber();

    const newAllowedOrigins = [
        ...allowedOrigins,
        { id: newId, title, url, hostname, status: true, options },
    ];

    const result = await User.updateOne(
        {
            username: owner,
        },
        {
            allowedOrigins: newAllowedOrigins,
        }
    );

    if (result.modifiedCount > 0) {
        return {
            status: 200,
            message: "Origem criada com sucesso!",
            db: result,
            newAllowedOrigins,
        };
    } else return status.server_error;
};
