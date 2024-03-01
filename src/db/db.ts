
import { log } from 'console'
import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () => {
    try {
        log('connecting to this db url', process.env.DB_URL)
        await connect(process.env.DB_URL)
    } catch (err) {
        log('error connecting to db', err)
    }
}
