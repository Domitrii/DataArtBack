import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const DB_URI="mongodb+srv://vika:12062005@cluster0.oddadwz.mongodb.net/DataArt?retryWrites=true&w=majority&appName=Cluster0"


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
