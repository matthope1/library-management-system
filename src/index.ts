// src/index.js
import express, { Express, Request, Response } from "express";
import { Schema, model, connect } from 'mongoose';
import dotenv from "dotenv";
import { log } from "console";
import routes from './routes/routes'

dotenv.config();

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
}, {
  collection: 'users' // Specify the collection name here
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect(process.env.DB_URL);
  log('process.env.DB_URL: ',process.env.DB_URL)

  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  // await user.save();

  console.log(user.email); // 'bill@initech.com'
}


const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api/', routes)

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});