import { log } from 'console'
import { Request, Response, NextFunction } from 'express'

// https://expressjs.com/en/guide/using-middleware.html

export const errorHandler = ((err: Error, req: Request, res: Response, next: NextFunction) => {
  log('Error handler error: ', err)
  res.status(500).json({ error: err.message })
})


