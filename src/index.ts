import express, { Express, Request, Response } from 'express';
import routes from './routes/routes'
import { connectDB } from './db/db';
import bodyParser from 'body-parser';

connectDB()

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use('/api/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


// Error response
//   res.status(500).json({ error: errorMessage })
// // Success response
//   res.json({ message: successMessage })