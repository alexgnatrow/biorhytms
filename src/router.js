const router = require("express").Router();
const utils = require("./utils");

/**  to avoid 304 status code
 *   https://vlasenko.org/2011/10/12/expressconnect-static-set-last-modified-to-now-to-avoid-304-not-modified/
 */
router.get("/*", (req, res, next) => {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});

//default
router.route("/").get((req, res) => res.redirect("/home"));

router.get("/home", utils.home);
router.post("/calculate", utils.calculate);

//error screen
router.get("*", (req, res) => utils.error(req, res, "404"));

module.exports = router;
