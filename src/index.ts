import express, { Express, Request, Response, NextFunction} from 'express';
import routes from './routes/routes'
import { connectDB } from './db/db';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorMiddleware';

connectDB()

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

// error handling middleware
app.use(errorHandler)

app.use('/api/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});