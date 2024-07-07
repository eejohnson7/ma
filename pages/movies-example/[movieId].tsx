import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    var movieId = req.query; // localhost/api/[movieId]

    // mongoose is an object data modeling library for MongoDB & Node.js
    // it manages the relationships between data, provides schema validation, 
    // and is used to translate between objects in code & the representation 
    // of those objects in MongoDB
    var mongoose = require('mongoose'); 
    movieId = new mongoose.Types.ObjectId(movieId);
    
    const movie = await db
      .collection("movies")
      .find({ _id: movieId })
      .toArray();

      res.json(movie);
  } catch (e) {
    console.error(e);
  }
};