import { jokeSchema, updateSchema } from "./schema.js"
import Joke from "./module.js"
import { v4 as uuidv4 } from 'uuid';

async function getJoke(req, res, next) {
    try {
        const { currentJokeId } = req.query;
        let jokes = await Joke.find();

        if (currentJokeId) {
            jokes = jokes.filter(joke => joke._id !== currentJokeId);
        }
        if (jokes.length === 0) {
            return res.status(404).json({ message: "No other jokes available" });
        }
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        res.status(200).json(randomJoke);
    } catch (err) {
        next(err);
    }
}



export async function postJoke(req, res, next) {
    try {
        const { error } = jokeSchema.validate(req.body);
        if (error) {
            throw new HttpError(400, error.message);
        }
        
        const { question, answer, votes, availableVotes } = req.body;

        const newJoke = await Joke.create({
            id: uuidv4(), 
            question,
            answer,
            votes: votes || [], 
            availableVotes: availableVotes || ["😂", "👍", "❤️"]
        });

        res.status(201).json(newJoke);
    } catch (err) {
        next(err); 
    }
}

export async function updateVotes(req, res, next) {
    try {
        const { error } = updateSchema.validate(req.body);
        if (error) {
            throw new HttpError(400, error.message);
        }
        
        const { jokeId, voteType } = req.body;
        
        const joke = await Joke.findById(jokeId);
        if (!joke) {
            throw new HttpError(404, 'Joke not found');
        }

        const voteIndex = joke.votes.findIndex(vote => vote.label === voteType);
        console.log(voteIndex)
        
        if (voteIndex !== -1) {
            joke.votes[voteIndex].value += 1
        }

        await joke.save();

        res.status(200).json(joke);
    } catch (err) {
        next(err);
    }
}


export default getJoke