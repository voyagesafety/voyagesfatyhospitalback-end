const express = require("express");
const router = express.Router();
const formidable = require("formidable")
const { RegistrarWeb3Provider } = require("../Connection");
const privateKey = '0015de89ee814871af24848a812f3c20d694d969c7919d36ce07f7126eb02c88';

router.get("/acc", async (req, res) => {
  var registrarProvider = RegistrarWeb3Provider(privateKey);
  var account = await registrarProvider.web3.eth.getAccounts();
  res.json({ account: account });
});

router.post("/person/addVaccine", async (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req ,async (err, field) =>{
      console.log(field)
      if(field.Dose === "1"){
      const {
      citizenIdInput,
      firstNameInput,
      lastNameInput,
      genderInput,
      vaccineName,
      dateGetVaccine,
      hospitalName
    } = field;
    var vaccineName2 = "";
    var dateGetVaccine2 = "";
    var hospitalName2 = "";
    var registrarProvider = RegistrarWeb3Provider(privateKey);
    var account = await registrarProvider.web3.eth.getAccounts();
    try{
      console.log("start")
    return await registrarProvider.vaccination.methods.addVaccine(
      citizenIdInput,
      firstNameInput,
      lastNameInput,
      genderInput,
      vaccineName,
      dateGetVaccine,
      hospitalName,
      vaccineName2,
      dateGetVaccine2,
      hospitalName2).send({ from: account[0]}).then((receipt) => {
        console.log("Receipt : ", receipt);
        console.log("Status : ", receipt.status);
        if (receipt.status) {
          status = true;
          //hash = transactionHash;
        } else {
          status = true;
          //hash = transactionHash;
        }
        res.json({result: true})
        return { status: status };
      });
    } catch (err) {
      console.error("error" + err);
      res.json({result: false});
    }
  }else{
    const {
      citizenIdInput,
      firstNameInput,
      lastNameInput,
      genderInput,
      vaccineName,
      dateGetVaccine,
      hospitalName
    } = field;
    var registrarProvider = RegistrarWeb3Provider(privateKey);
    var addressData = await registrarProvider.vaccination.methods.getVaccine(citizenIdInput).call();
    var vaccineName1 = addressData.vaccineName1;
    var dateGetVaccine1 = addressData.dateGetVaccine1;
    var hospitalName1 = addressData.hospitalName1;
    var registrarProvider = RegistrarWeb3Provider(privateKey);
    var account = await registrarProvider.web3.eth.getAccounts();
    try{
      console.log("start");
    return await registrarProvider.vaccination.methods
    .addVaccine(
      citizenIdInput,
      firstNameInput,
      lastNameInput,
      genderInput,
      vaccineName1,
      dateGetVaccine1,
      hospitalName1,
      vaccineName,
      dateGetVaccine,
      hospitalName,
    ).send({ from: account[0]}).then((receipt) => {
      console.log("Receipt : ", receipt);
      console.log("Status : ", receipt.status);
      if (receipt.status) {
        status = true;
        //hash = transactionHash;
      } else {
        status = true;
        //hash = transactionHash;
      }
      res.json({result: true});
      return { status: status };
    });
  } catch (err) {
    console.error("error" + err);
    res.json({result: false});
  }
  }
})    
 
})

router.post("/vaccine/:citizenid", async (req, res) => {
  const { citizenid } = req.params;
  getStatus = async (citizenid) => {
    try {
      var registrarProvider = RegistrarWeb3Provider(privateKey);
      var addressData = await registrarProvider.vaccination.methods
        .getVaccine(citizenid)
        .call((err, res) => {
          if (!err) {
            console.log(res);
            return res;
          } else {
            console.log(err);
          }
        });
        return addressData
    } catch (error) {
      return "" 
    }
  }
  var data = await getStatus(citizenid);
  res.json({
    result: data,
  //   "result": {
  //     "0": true,
  //     "1": "0",
  //     "2": "",
  //     "3": "",
  //     "4": "",
  //     "5": "",
  //     "6": "",
  //     "7": "",
  //     "haveVaccine": true,
  //     "countVaccine": "0",
  //     "vaccineName1": "Astra",
  //     "dateGetVaccine1": "2021-11-29",
  //     "hospitalName1": "โรงพยาบาลตากสิน",
  //     "vaccineName2": "Astra",
  //     "dateGetVaccine2": "2021-11-29",
  //     "hospitalName2": "โรงพยาบาลตากสิน"
  // }
  });
});

module.exports = router;