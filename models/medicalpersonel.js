const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const medpersonel = sequelize.define(
    "MedPersonel",
    {
        // attributes
        MedId: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        MedUsername: {
          type: Sequelize.STRING,
        },
        MedPassword: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        tableName: 'MedicalPersonel',
        schema: 'Voyage_Safety',}
    );
    
    (async () => {
      await medpersonel.sync({ force: false });
    })();
    
    module.exports = medpersonel;
    