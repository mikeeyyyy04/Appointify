import * as mongoose from "mongoose";
import {logger} from "../logger";

export async function initializeMongoose() {
    if (process.env.MONGO_URI === null) {
        logger.error("Property `MONGO_ENV` must be configured in your .env file.")
        process.exit()
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "clinicals"
        })
    } catch (e) {
        logger.error("Failed to connect to MongoDB: ", e)
        process.exit()
    }
}