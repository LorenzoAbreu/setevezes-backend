const Fake = require("../models/Fake");

module.exports = class FakeController {
    async getAll() {
        return {
            status: 200,
            fakes: await Fake.find(),
        };
    }
};
