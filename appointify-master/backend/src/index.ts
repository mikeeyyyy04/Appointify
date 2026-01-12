import { Hono } from 'hono'
import * as  dotenv from 'dotenv'
import {initializeMongoose} from "./database";
import {usersRoute} from "./routes/users";
import {logger} from "./logger";
import mongoose from "mongoose";
import {clinicsRoute} from "./routes/clinics";
import {requestLoggerMiddleware} from "./logger/request";
import {cors} from "hono/cors";

export default await (async () =>  {
    dotenv.config()
    logger.info(`Connecting to MongoDB.`)
    await initializeMongoose()

    logger.info(`Connected to MongoDB under the database ${mongoose.connection.db.databaseName}.`)
    const app = new Hono()
    app.use(requestLoggerMiddleware)
    app.use(cors())
    app.route('/users', usersRoute)
    app.route('/clinics', clinicsRoute)

    Bun.serve({
        port: 7325,
        fetch(req, server) {
            return app.fetch(req, { ip: server.requestIP(req) })
        }
    })
})()
