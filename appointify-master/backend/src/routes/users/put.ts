import {Context} from "hono";
import {HttpBadRequestCode} from "../../http/statusCodes";
import * as argon2 from 'argon2'
import {argon2id} from "argon2";
import {User} from "../../database/schemas/user";
import {uniuri} from "../../utils/uniuri";
import {Clinic} from "../../database/schemas/clinic";
import {MongooseError} from "mongoose";

export const putUserRoute = async (context: Context) => {
    const body = await context.req.json()
    if (body['username'] == null || body['password'] == null || body['clinic_name'] == null) {
        return context.json({
            error: "Missing fields, either: `username`, `password` or `clinic_name`."
        }, {
            status: HttpBadRequestCode
        })
    }

    const username = body['username']
    const password = body['password']
    const clinicName = body['clinic_name']

    const hashedPassword= await argon2.hash(password, {
        type: argon2id
    })

    const token = uniuri(256)
    try {
        const user = new User({
            username: username,
            password: hashedPassword,
            created_at: new Date(),
            tokens: [token]
        })
        await user.save()

        const clinic = new Clinic({
            name: clinicName,
            serving: 0,
            owner: user._id,
            available: false
        })
        await clinic.save()

        user.tokens = []
        return context.json({
            clinic: clinic,
            user: user.toObject(),
            token: token
        })
    } catch (e) {
        if (e instanceof Error && e.message != null && e.message.includes('E11000')) {
            return context.json({
                error: "The username is already taken, please try another username."
            }, {
                status: HttpBadRequestCode
            })
        }

        throw e
    }
}