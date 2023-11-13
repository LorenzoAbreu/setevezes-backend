const User = require("../../database/models/User");
const getHostname = require("../../functions/getHostname");
const status = require("../../functions/status");
const verifyUrl = require("../../functions/verifyUrl");
const generateId = require("../../functions/generateId");

module.exports = class OriginController {
    async getAll(username) {
        const userData = await User.findOne({
            username,
        });

        return {
            status: 200,
            origins: userData.allowedOrigins || [],
        };
    }

    async create(username, title, url, options) {
        const userData = await User.findOne({
            username,
        });
        let userOrigins = userData.allowedOrigins || [];
        const checkOrigin = userOrigins.find((o) => o.url === url);
        const hostname = getHostname(url);

        if (checkOrigin) return status.url_already_been_created;

        if (!verifyUrl(url) || !hostname) {
            return {
                status: 401,
                error: "URL inválida!",
            };
        }

        const newOriginData = {
            hostname,
            url,
            id: generateId(),
            options,
            status: true,
            title,
        };

        userOrigins.push(newOriginData);

        userData.allowedOrigins = userOrigins;
        const result = await userData.save();

        if (result) {
            console.log("criou");
            return {
                status: 200,
                message: "Origem criada com sucesso!",
                newOrigin: newOriginData,
                origins: userOrigins,
            };
        } else return status.server_error;
    }

    async delete(username, id) {
        const userData = await User.findOne({
            username,
        });
        let userOrigins = userData.allowedOrigins || [];
        const checkOrigin = userOrigins.find((o) => o.id === id);

        if (checkOrigin) {
            userOrigins = await userOrigins.filter((o) => o.id !== id);

            return {
                status: 200,
                newOrigins: userOrigins,
            };
        } else {
            return {
                status: 404,
                error: "Origem não encontrada!",
            };
        }
    }
};
