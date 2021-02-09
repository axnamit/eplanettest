const validator = require("validator");

function validateUserName(data) {
  data.body.user_name = data.body.user_name ? data.body.user_name : "";
  if (validator.isEmpty(data.body.user_name))
    return { success: false, message: "Please enter valid user name" };

  return { success: true, message: "good to go." };
}

module.exports = validateUserName;
