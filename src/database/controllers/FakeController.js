const status = require("../../functions/status");
const Fake = require("../models/Fake");
const User = require("../models/User");

module.exports = class FakeController {
    async getAll() {
        return {
            status: 200,
            fakes: await Fake.find(),
        };
    }

    async registerUser(username, fakeId, options) {
        const fakeData = await Fake.findOne({ id: fakeId });
        if (!fakeData) return status.server_error;

        const userData = await User.findOne({ username });
        if (!userData) return status.server_error;

        let userFakes = userData.fakes || [];
        console.log(userFakes);

        if (userFakes.find((fake) => fake.id === fakeId)) {
            return {
                status: 403,
                error: "Você já tem este fake!",
            };
        }

        userFakes.push({
            id: fakeId,
            options,
        });

        userData.fakes = userFakes;

        const result = await userData.save();

        if (result) {
            return {
                status: 200,
                message: "Fake criada com sucesso!",
            };
        } else return status.server_error;
    }
};
