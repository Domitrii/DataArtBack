import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    votes: [
      {
        value: {
          type: Number,
          required: true,
          min: 0
        },
        label: {
          type: String,
        }
      }
    ],
    availableVotes: {
      type: [String],
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Joke", jokeSchema);
