const User = require("../../database/models/User");
const status = require("../../functions/status");

const CreateOrigin = require("./functions/CreateOrigin");
const DeleteOrigin = require("./functions/DeleteOrigin");
const EditOrigin = require("./functions/EditOrigin");

module.exports = class OriginController {
    async GetAll(owner) {
        const userData = await User.findOne({
            username: owner,
        });

        if (!owner || !userData) {
            return status.user_not_found;
        }

        console.log(userData);
        return userData.allowedOrigins || [];
    }

    async Edit(owner, url, title, newUrl, options) {
        return await EditOrigin(owner, url, title, newUrl, options);
    }

    async Create(owner, title, url, options) {
        return await CreateOrigin(owner, title, url, options);
    }

    async Delete(owner, id) {
        return DeleteOrigin(owner, id);
    }
};
