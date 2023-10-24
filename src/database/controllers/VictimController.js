const Victim = require("../models/Victim");
const status = require("../../functions/status");

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

  async Create(owner, data) {
    const newVictim = new Victim({
      owner,
      data,
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
