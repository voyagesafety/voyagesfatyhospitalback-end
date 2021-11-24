const express = require("express");
const router = express.Router();
const medpersonel = require("../models/medicalpersonel.js");
const constants = require("../constant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuthen = require("./../middleware/authentication");
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('voyageSafetySecretKey');


router.post("/Login", async (req, res) => {
    const { MedUsername, MedPassword } = req.body;
    console.log(MedUsername,MedPassword);

    let result = await medpersonel.findOne({ where: { MedUsername: MedUsername} });
    if (result != null) {
        if (bcrypt.compareSync(MedPassword, result.MedPassword)) {
          const token = jwt.sign({ result }, "voyage", { expiresIn: "10h" });
          res.json({
            result: constants.kResultOk,
            // message: JSON.stringify({
            token: token,
            // }),
          });
        } else {
          res.json({
            result: constants.kResultNok,
            message: "Incorrect password",
          });
        }
    } else {
      res.json({ result: constants.kResultNok, message: "Incorrect username" });
    }
  });

  router.get("/info", checkAuthen, (req, res) => {
  const { userData } = req;
  if (Object.entries(userData).length !== 0) {
    medpersonel
      .findOne({ where: { MedId: userData.result.MedId } })
      .then((result) => {
        res.json({ result, error: {} });
      })
      .catch((err) => {
        res.json({
          result: {},
          error: { status: 404, message: "Not Found" },
        });
      });
  } else {
    console.log(error);
    res.json({ result: {}, error: { status: 404, message: "Not Found" } });
  }
});

module.exports = router;