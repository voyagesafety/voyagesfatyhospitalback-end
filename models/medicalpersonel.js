const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const medpersonel = sequelize.define(
    "Medpersonel",
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
      await user.sync({ force: false });
    })();
    
    module.exports = medpersonel;
    