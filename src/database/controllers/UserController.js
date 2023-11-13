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
            username,
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
            result: {
                username: result.username,
                email: result.email,
                approved: result.approved,
                admin: result.admin,
            },
            token: await jwt.sign(newUserData),
            apiKey: newUserData.apiKey,
        };
    }

    async login(username, password) {
        const checkUser = await User.findOne({
            username,
        }).select("username password approved admin apiKey email");

        if (!checkUser || password != checkUser.password) {
            return status.invalid_login_data;
        }

        if (checkUser.approved != true) {
            return status.user_not_approved;
        }

        const userData = {
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

        return userData.fakes || [];
    }
};
