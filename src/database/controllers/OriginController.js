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

    async create(username, title, Url, options) {
        console.log(options);
        let url = Url;

        if (!Url.startsWith("http")) {
            url = "https://" + Url;
        }

        const userData = await User.findOne({
            username,
        });
        let userOrigins = userData.allowedOrigins || [];
        const checkOrigin = userOrigins.find((o) => o.url === url);
        const hostname = getHostname(url);

        if (
            userOrigins.length ===
            (userData.maxOriginsLimit ? userData.maxOriginsLimit : 3)
        ) {
            return {
                status: 401,
                error: "Ops! Você atingiu seu limite máxio de origens. Entre em contato com nosso suporte caso precise de mais espaço!",
            };
        }

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
            console.log("criou", result);
            return {
                status: 200,
                message: "Origem criada com sucesso!",
                newOrigin: newOriginData,
                origins: userOrigins,
            };
        } else return status.server_error;
    }

    async edit(username, id, title, Url, options) {
        console.log(options);
        let url = Url;

        if (!Url.startsWith("http")) {
            url = "https://" + Url;
        }

        const userData = await User.findOne({
            username,
        });
        let userOrigins = userData.allowedOrigins || [];
        const checkOrigin = userOrigins.find((o) => o.id === id);

        if (!checkOrigin)
            return {
                status: 404,
                error: "Origem não encontrada!",
            };

        if (url != checkOrigin.url) {
            const hostname = getHostname(url);

            if (!verifyUrl(url) || !hostname) {
                return {
                    status: 401,
                    error: "URL inválida!",
                };
            }

            checkOrigin.url = url;
            checkOrigin.hostname = hostname;
        }

        checkOrigin.options = options;
        checkOrigin.title = title;

        userData.allowedOrigins = userOrigins;
        const result = await userData.save();

        if (result) {
            console.log("editou", result);
            return {
                status: 200,
                message: "Origem editada com sucesso!",
                origin: checkOrigin,
                newOrigins: userOrigins,
            };
        } else return status.server_error;
    }

    async delete(username, id) {
        console.log("originController[delete]");
        const userData = await User.findOne({
            username,
        });
        let userOrigins = userData.allowedOrigins || [];
        const checkOrigin = userOrigins.find((o) => o.id === id);

        if (checkOrigin) {
            userOrigins = await userOrigins.filter((o) => o.id !== id);
            userData.allowedOrigins = userOrigins;

            const result = await userData.save();

            if (result) {
                return {
                    status: 200,
                    newOrigins: userOrigins,
                    message: "Origem deletada com sucesso!",
                };
            } else {
                return status.server_error;
            }
        } else {
            return {
                status: 404,
                error: "Origem não encontrada!",
            };
        }
    }
};
