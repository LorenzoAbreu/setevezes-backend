const User = require("../models/User");
const jwt = require("../../functions/jwt");
const crypto = require("crypto");
const EmailValidator = require("email-validator");
const status = require("../../functions/status");

function generateApiKey() {
    try {
        const hash = crypto.randomBytes(19).toString("hex");

        let apiKey = "tpd7" + hash + "ntc";

        apiKey =
            apiKey.slice(0, parseInt(apiKey.length / 2)) +
            "zzz" +
            apiKey.slice(parseInt(apiKey.length / 2), apiKey.length);

        return apiKey;
    } catch {
        return "apiKey_rand__" + Math.floor(Math.random() * 999999);
    }
}

module.exports = class UserController {
    async get({ username, apiKey, email }) {
        return await User.findOne({
            $or: [{ apiKey }, { username }, { email }],
        });
    }

    async getAll() {
        return {
            status: 200,
            users: await User.find(),
        };
    }

    async getCloakerData(key, hostname) {
        const userData = await this.get({ apiKey: key });

        const origin = userData.allowedOrigins.find(
            (o) => o.hostname === hostname
        );

        return origin.options;
    }

    async create(username, email, password) {
        const checkUser = await this.get({ username });
        const checkEmail = await this.get({ email });

        if (checkUser) return status.user_already_been_used;
        if (!EmailValidator.validate(email)) return status.invalid_email;
        if (checkEmail) return status.email_already_been_used;

        const newUserData = {
            id:
                "_mv25g__account_____" +
                Math.floor(Math.random() * 999999) +
                "_" +
                Math.floor(Math.random() * 99999),
            username,
            maxOriginsLimit: 3,
            email,
            approved: false,
            admin: false,
            apiKey: await generateApiKey(),
        };

        const newUser = new User({
            ...newUserData,
            allowedOrigins: [],
            password,
        });

        const result = await newUser.save();

        return {
            status: 200,
            result: newUserData,
            token: await jwt.sign(newUserData),
            apiKey: newUserData.apiKey,
        };
    }

    async login(username, password, userIp) {
        const checkUser = await User.findOne({
            username,
        }).select("id username password approved admin apiKey ips email");

        if (!checkUser || password != checkUser.password) {
            return status.invalid_login_data;
        }

        if (checkUser.approved != true) {
            return status.user_not_approved;
        }

        if (!checkUser.admin) {
            let userIps = checkUser.ips;
            let checkIp = userIps.find((i) => i.ip === userIp);

            if (!checkIp) {
                console.log(checkIp);
                userIps.push({
                    ip: userIp,
                    access: 1,
                });
                console.log({ userIps });
            } else {
                const filteredArray = userIps.filter(
                    (i) => i.ip !== checkIp.ip
                );
                const newUserIp = {
                    ip: userIp,
                    access: checkIp.access + 1,
                };
                console.log({ userIps, filteredArray, newUserIp });
                userIps = [...filteredArray, newUserIp];
            }

            checkUser.ips = userIps;

            if (!(await checkUser.save())) {
                return {
                    status: 403,
                    error: "Ops! Foi identificada uma atividade suspeita na sua conta. Por favor entre em contato com nosso suporte para resolver isso.",
                };
            }

            if (userIps.length > 1) {
                let haveThanMoreOneAccess = 0;

                await userIps.map((i) => {
                    if (i.access > 1) {
                        haveThanMoreOneAccess = haveThanMoreOneAccess + 1;
                    }
                });

                if (haveThanMoreOneAccess > 2) {
                    return {
                        status: 403,
                        error: "Ops! Foi identificada uma atividade suspeita na sua conta. Por favor entre em contato com nosso suporte para resolver isso.",
                    };
                }
            }
        }

        const userData = {
            id: checkUser.id,
            username,
            email: checkUser.email,
            approved: checkUser.approved,
            admin: checkUser.admin,
            apiKey: checkUser.apiKey,
        };

        return {
            status: 200,
            token: await jwt.sign(userData),
            apiKey: checkUser.apiKey,
            message: "Seja muito bem-vindo, " + username + "!",
        };
    }

    async getMyFakes(username) {
        const userData = await User.findOne({
            username,
        });

        const userFakes = userData.fakes || [];

        console.log("Fakes do usuário", userFakes);

        return {
            status: 200,
            fakes: userFakes,
        };
    }

    async deleteFake(username, fakeId) {
        const userData = await User.findOne({
            username,
        });

        let userFakes = userData.fakes || [];
        const checkFake = userFakes.find((f) => f.id === fakeId);

        if (!checkFake) {
            return {
                status: 404,
                error: "Fake não encontrada!",
            };
        }

        userFakes = userFakes.filter((f) => f.id !== fakeId);

        userData.fakes = userFakes;
        const result = await userData.save();

        if (result) {
            return {
                status: 200,
                newFakes: userFakes,
                message: "Fake deletada com sucesso!",
            };
        } else return status.server_error;
    }
};
