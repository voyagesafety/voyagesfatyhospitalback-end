const express = require("express");
const router = express.Router();
const { RegistrarWeb3Provider } = require("../Connection");
const privateKey = '0015de89ee814871af24848a812f3c20d694d969c7919d36ce07f7126eb02c88';

router.get("/acc", async (req, res) => {
  var registrarProvider = RegistrarWeb3Provider(privateKey);
  var account = await registrarProvider.web3.eth.getAccounts();
  res.json({ account: account });
});

router.post("/person/add1", async (req, res) => {
  const {
    citizenIdInput,
    firstNameInput,
    lastNameInput,
    genderInput,
    vaccineName1,
    hospitalName1,
  } = req.body;

  if (
    !citizenIdInput ||
    !firstNameInput ||
    !lastNameInput ||
    !genderInput ||
    !vaccineName1 ||
    !hospitalName1
  ) {
    return res.json({
      success: false,
      error: "Please fill the form.",
    });
  }
  var nowDate = new Date();
  var dateGetVaccine1 =
    nowDate.getFullYear() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getDate();
  var vaccineName2 = "";
  var dateGetVaccine2 = "";
  var hospitalName2 = "";
  var registrarProvider = RegistrarWeb3Provider(privateKey);
  var account = await registrarProvider.web3.eth.getAccounts();
  //var balance = await registrarProvider.web3.eth.getBalance(account[0]);
  //var firstNoune = registrarProvider.web3.eth.getTransactionCount(account[0]);
  //console.log("Account : ", account);
  //console.log("Nounce : ", await firstNoune);
  try {
    console.log("1");
    return await registrarProvider.transcript.methods
      .addVaccine(
        citizenIdInput,
        firstNameInput,
        lastNameInput,
        genderInput,
        vaccineName1,
        dateGetVaccine1,
        hospitalName1,
        vaccineName2,
        dateGetVaccine2,
        hospitalName2
      )
      .send({ from: account[0] })
      .then((receipt) => {
        console.log("Result : ", receipt);
        console.log("Receipt : ", receipt.status);
        if (receipt.status) {
          status = true;
          //hash = transactionHash;
        } else {
          status = true;
          //hash = transactionHash;
        }
        return { status: status };
        // if (!err) {
        //     status = true;
        //     hash = transactionHash;

        // } else {
        //     status = false;
        //     hash = "No Transaction Hash"
        // }
        // //console.log("Status : "+status)
      });
  } catch (err) {
    console.error("" + err);
  }
});

router.post("/person/add2", async (req, res) => {
  const {
    citizenIdInput,
    firstNameInput,
    lastNameInput,
    genderInput,
    vaccineName1,
    hospitalName1,
    dateGetVaccine1,
    vaccineName2,
    hospitalName2,
  } = req.body;

  if (
    !citizenIdInput ||
    !firstNameInput ||
    !lastNameInput ||
    !genderInput ||
    !vaccineName1 ||
    !hospitalName1 ||
    !dateGetVaccine1 ||
    !vaccineName2 ||
    !hospitalName2
  ) {
    return res.json({
      success: false,
      error: "Please fill the form.",
    });
  }
  var nowDate = new Date();
  var dateGetVaccine2 =
    nowDate.getFullYear() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getDate();
  var registrarProvider = RegistrarWeb3Provider(privateKey);
  var account = await registrarProvider.web3.eth.getAccounts();
  //var balance = await registrarProvider.web3.eth.getBalance(account[0]);
  //var firstNoune = registrarProvider.web3.eth.getTransactionCount(account[0]);
  //console.log("Account : ", account);
  //console.log("Nounce : ", await firstNoune);
  try {
    console.log("1");
    return await registrarProvider.transcript.methods
      .addVaccine(
        citizenIdInput,
        firstNameInput,
        lastNameInput,
        genderInput,
        vaccineName1,
        dateGetVaccine1,
        hospitalName1,
        vaccineName2,
        dateGetVaccine2,
        hospitalName2
      )
      .send({ from: account[0] })
      .then((receipt) => {
        console.log("Result : ", receipt);
        console.log("Receipt : ", receipt.status);
        if (receipt.status) {
          status = true;
          //hash = transactionHash;
        } else {
          status = true;
          //hash = transactionHash;
        }
        return { status: status };
        // if (!err) {
        //     status = true;
        //     hash = transactionHash;

        // } else {
        //     status = false;
        //     hash = "No Transaction Hash"
        // }
        // //console.log("Status : "+status)
      });
  } catch (err) {
    console.error("" + err);
  }
});

router.post("/person/:citizenid", async (req, res) => {
  const { citizenid } = req.params;
  var registrarProvider = RegistrarWeb3Provider(privateKey);
  var addressData = await registrarProvider.transcript.methods
    .getVaccine(citizenid)
    .call((err, res) => {
      if (!err) {
        return res;
      } else {
        console.log(err);
      }
    });
  console.log(addressData);
  res.json({
    result: addressData,
  });
});

router.post("/vaccine/:citizenid", async (req, res) => {
  //   try {
  const { citizenid } = req.params;
  var registrarProvider = RegistrarWeb3Provider(privateKey);
  var addressData = await registrarProvider.transcript.methods
    .getVaccine(citizenid)
    .call((err, res) => {
      if (!err) {
        console.log(res);
        return res;
      } else {
        console.log(err);
      }
    });

  res.json({
    result: addressData,
  });
  //       const result = await getVaccine(citizenid);
  //       return res.json({
  //          success: true,
  //          data: result,
  //          error: null,
  //       });
  //   }
  //   catch (error) {
  //     return res.json({
  //       success: false,
  //       error: error.message,
  //     });
  //   }
});

module.exports = router;