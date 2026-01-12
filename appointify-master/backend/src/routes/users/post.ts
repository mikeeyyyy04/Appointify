import {Context} from "hono";
import {HttpBadRequestCode} from "../../http/statusCodes";
import {User} from "../../database/schemas/user";
import * as argon2 from 'argon2'
import {uniuri} from "../../utils/uniuri";

export const postUserRoute = async (context: Context) => {
    const body = await context.req.json()
    if (body['username'] == null || body['password'] == null) {
        return context.json({
            error: "Missing fields, either: `username` or `password`."
        }, {
            status: HttpBadRequestCode
        })
    }

    const username = body['username']
    const password = body['password']

    const user = await User.findOne({
        username: username
    }).exec()

    if (user == null) {
        return context.json({
            error: "The username, or password is invalid."
        }, {
            status: HttpBadRequestCode
        })
    }

    const matches = await argon2.verify(user.password!, password)
    if (!matches) {
        return context.json({
            error: "The username, or password is invalid."
        }, {
            status: HttpBadRequestCode
        })
    }

    const token = uniuri(256)
    const newUser = await User.findOneAndUpdate(
        {_id: user._id,},
        {$addToSet: {tokens: [token]}},
        {new: true}
    ).exec()

    return context.json({
        token: token,
        user: newUser!.toObject()
    })
}