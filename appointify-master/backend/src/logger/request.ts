import {Context, Env, Next} from "hono";
import {logger} from "./index";
import type {SocketAddress} from "bun";

export const requestLoggerMiddleware = async (context: Context<Env>, next: Next) => {
    const ip: SocketAddress | null = context.env?.ip as SocketAddress | null
    const remoteAddress = context.req.header()['x-forwarded-for'] ?? ip?.address
    logger.info(
        `${context.req.method} ${context.req.path}`,
        {'User-Agent': context.req.header()['user-agent'], "Remote-Address": remoteAddress}
    )
    await next()
}