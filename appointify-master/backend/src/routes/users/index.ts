import {Context, Hono} from "hono";
import {putUserRoute} from "./put";
import {postUserRoute} from "./post";
import {mustBeAuthenticated} from "../../middlewares/authenticated";
import {User} from "../../database/schemas/user";

export const usersRoute = new Hono()
usersRoute.put('/', putUserRoute)
usersRoute.post('/', postUserRoute)
usersRoute.get('/', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user').toObject()
    return context.json(user)
})
usersRoute.delete('/', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    const token = context.req.header('authorization')!

    await User.updateOne({ _id: user._id }, { $pull: { tokens: token } }).exec()
    return context.json({ ack: true })
})