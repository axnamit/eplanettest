const validateUserName = require("../validators/validators");
const superagent = require("superagent");

exports.getUserRepos = (req, res) => {
  let validatorResponse = validateUserName(req);
  if (!validatorResponse.success)
    return res.json({ success: false, message: validatorResponse.message });

  const user_name = req.body.user_name;

  let url = `https://api.github.com/users/${user_name}/repos`;

  superagent
    .get(url)
    .set("User-Agent", "node js")
    .set("Accept", "application/json")
    .end((err, response) => {
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong",
          data: err,
        });
      }
      let arr = [];
      response.body.forEach((element) => {
        arr.push({
          name: element.name,
          branch: element.default_branch,
          avatar: element.owner.avatar_url,
        });
      });
      return res.json({
        success: false,
        message: "fetched successfully",
        data: arr,
      });
    });
};

exports.getAllCommits = (req, res) => {
  //   let user_name = req.body.user_name;
  //   let repo = req.body.repo;
  let url = `https://api.github.com/repos/ProFullStackDev/StarWars/commits`;
  //return res.json(url);

  superagent
    .get(url)
    .set("User-Agent", "node js")
    .set("Accept", "application/json")
    .end((err, response) => {
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong",
          data: err,
        });
      }
      let arr = [];
      let userInfo = {
        username: response.body[0].author.login,
        avatar_url: response.body[0].author.avatar_url,
      };
      response.body.forEach((element) => {
        arr.push({
          message: element.commit.message,
          hash: element.commit.tree.sha,
        });
      });
      return res.json({
        success: false,
        message: "fetched successfully",
        data: { userInfo, arr },
      });
    });
};
