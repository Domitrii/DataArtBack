import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const { DB_URI } = process.env
console.log(DB_URI)

if (!DB_URI) {
  console.error("Error: DB_URI is not defined in .env");
  process.exit(1);
}

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db alright");
  })
  .catch(error => {
    console.error("u have error: ", error);  
    process.exit(1);  
  });
