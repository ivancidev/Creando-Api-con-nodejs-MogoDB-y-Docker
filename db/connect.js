const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
    .then(() => {
      console.log("Conectado con exito la BD!!");
    })
    .catch((err) => console.log("Error al conectar la BD", { err }));
};

module.exports = dbConnect;