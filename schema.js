import Joi from "joi";

export const jokeSchema = Joi.object({
    id: Joi.string(),
  question: Joi.string().required(),
  answer: Joi.string().required(),
  votes: Joi.array().items(
    Joi.object({
      value: Joi.number().integer().min(0),
      label: Joi.string()
    })
  ),
  availableVotes: Joi.array().items(Joi.string()).required()
});

export const updateSchema = Joi.object({
    jokeId: Joi.string().required(),
    voteType: Joi.string().valid('😂', '👍', '❤️').required()
});