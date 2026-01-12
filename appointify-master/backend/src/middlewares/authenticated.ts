import {Context, Next} from "hono";
import {HttpUnauthorizedCode} from "../http/statusCodes";
import {User} from "../database/schemas/user";

export const mustBeAuthenticated = async (context: Context, next: Next) => {
    const authorization = context.req.header('authorization')
    if (authorization == null) {
        return context.json({
            error: "Missing 'Authorization' header."
        }, {
            status: HttpUnauthorizedCode
        })
    }

    const user = await User.findOne({
        tokens: {
            $in: [authorization]
        }
    }).exec()

    if (user == null) {
        return context.json({
            error: "Invalid token. Your session may have expired, please re-login."
        }, {
            status: HttpUnauthorizedCode
        })
    }

    context.set('user', user)
    await next()
}