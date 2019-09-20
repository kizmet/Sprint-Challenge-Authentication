const axios = require("axios");
const authenticate = require("../auth/authenticate-middleware.js");
module.exports = router => {
  router.get("/", (req, res) => {
    const requestOptions = {
      headers: { accept: "application/json" }
    };

    axios
      .get("https://icanhazdadjoke.com/search", requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: "Error Fetching Jokes", error: err });
      });
  });
};
