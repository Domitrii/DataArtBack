import express from "express"
import getJoke, { postJoke, updateVotes } from "./file.js"

const router = express.Router()


router.get("/", getJoke)
router.post("/add", postJoke)
router.post("/updateVotes", updateVotes)

export default router