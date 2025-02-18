import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const {DB_URI} = process.env


mongoose.connect(DB_URI).then(console.log("db alright")).catch(error => {
    console.error("u have error: ", error)
    process.exit(1)
}) 


