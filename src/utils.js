const { routes } = require("./constants");

class Utils {
  home(req, res) {
    if (!req.session.isLoading) req.session.isLoading = false;
    return res.render("home", { ...req.session, routes });
  }
  calculate(req, res) {
    //TODO: implement calculation and load result to the session data or global variable

    return res.redirect("/home");
  }

  error(req, res, reason) {
    return res.render("404", { reason });
  }
}

module.exports = new Utils();
