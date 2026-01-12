import {createLogger, transports} from "winston";
import * as winston from "winston";

export const logger = createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new transports.Console()
    ]
})