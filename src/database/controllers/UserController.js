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
  async Edit(username, userData) {
    const {
      username: newUsername,
      email: newEmail,
      password: newPassword,
      admin: newAdminStatus,
      approved: newApprovedStatus,
      allowedOrigins: newAllowedOrigins,
    } = userData;

    if (
      !newUsername &&
      !newEmail &&
      !newPassword &&
      !newAdminStatus &&
      !newApprovedStatus &&
      !newAllowedOrigins
    ) {
      return status.fill_all_fields;
    }

    if (!username) return status.user_not_found;

    const checkUser = await User.findOne({
      username,
    });

    if (!checkUser) return status.user_not_found;

    const result = await User.updateOne(
      {
        username,
      },
      {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        admin: newAdminStatus,
        approved: newApprovedStatus,
        allowedOrigins: newAllowedOrigins,
      }
    );

    if (result.modifiedCount > 0) {
      return { status: 200, message: "Usuário editado com sucesso!" };
    } else return status.server_error;
  }

  async Create(username, email, password) {
    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    if (!username || !email || !password) {
      return status.fill_all_fields;
    }

    if (checkUser) {
      return status.user_already_been_used;
    }

    if (!EmailValidator.validate(email)) {
      return status.invalid_email;
    }

    if (checkEmail) {
      return status.email_already_been_used;
    }

    const newUserData = {
      username,
      email,
      approved: false,
      admin: false,
      apiKey: await generateApiKey(),
    };

    const newUser = new User({
      ...newUserData,
      password,
    });

    const result = await newUser.save();

    if (result.username) {
      return {
        status: 200,
        token: await jwt.sign(newUserData),
        apiKey: newUserData.apiKey,
        message: "Seja muito bem-vindo, " + username + "!",
      };
    } else {
      return status.server_error;
    }
  }

  async Login(username, password) {
    if (!username || !password) {
      return status.fill_all_fields;
    }

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
};
