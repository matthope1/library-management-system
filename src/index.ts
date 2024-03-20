import express, { Express, Request, Response, NextFunction} from 'express';
import routes from './routes/routes'
import { connectDB } from './db/db';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors'
import { log } from 'console';

connectDB()

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors());

// app.use((req, res, next) => {
//   log('New request at:', Date.now())
//   next()
// })

app.use('/api/', routes)

app.use(errorHandler)

app.get('*', (req: Request, res: Response) => {
  res.send('This resource cannot be found (?_?)');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});