
import { log } from 'console'
import { Request, Response } from 'express'

export const getAllBooks = (req: Request, res: Response): void => {
    log("get all boooks endpoint")
    res.json([])
}