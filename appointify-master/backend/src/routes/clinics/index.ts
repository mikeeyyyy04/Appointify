import {Context, Hono} from "hono";
import {mustBeAuthenticated} from "../../middlewares/authenticated";
import {Clinic} from "../../database/schemas/clinic";
import {HttpBadRequestCode, HttpNotFoundCode, InternalServerErrorCode} from "../../http/statusCodes";
import {Types} from "mongoose";
import {logger} from "../../logger";

export const clinicsRoute = new Hono()
clinicsRoute.get('/', async (context: Context) => {
    const searchPhrase = context.req.query('search')
    if (searchPhrase == null) {
        const clinics = await Clinic.find({}).exec()
        return context.json(clinics)
    }

    const clinics = await Clinic.find({
        $text: { $search: searchPhrase }
    }).exec()
    return context.json(clinics)
})

clinicsRoute.get('/own', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    const clinic = await Clinic.findOne({ owner: user._id }).exec()
    if (clinic == null) {
        context.status(HttpNotFoundCode)
        return context.res
    }
    return context.json(clinic)
})

clinicsRoute.put('/serving', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    const clinic = await Clinic.findOneAndUpdate({ owner: user._id }, { $inc: { serving: 1 } }, { new: true })
    return context.json(clinic)
})

clinicsRoute.delete('/serving', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    const clinic = await Clinic.findOneAndUpdate({ owner: user._id }, { $inc: { serving: -1 } }, { new: true })
    return context.json(clinic)
})

clinicsRoute.put('/availability', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    const clinic = await Clinic.findOneAndUpdate({ owner: user._id }, { $set: { available: true } }, { new: true })
    return context.json(clinic)
})

clinicsRoute.delete('/availability', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    const clinic = await Clinic.findOneAndUpdate({ owner: user._id }, { $set: { available: false } }, { new: true })
    return context.json(clinic)
})

clinicsRoute.get('/:id', async (context: Context) => {
    const id = context.req.param('id')
    if (!Types.ObjectId.isValid(id)) {
        return context.json({ error: "No clinic found." }, { status: HttpNotFoundCode })
    }

    const clinic = await Clinic.findById(id).exec()
    if (clinic == null) {
        return context.json({ error: "No clinic found." }, { status: HttpNotFoundCode })
    }
    return context.json(clinic)
})

clinicsRoute.delete('/', mustBeAuthenticated, async (context: Context) => {
    const user = context.get('user')
    // Attempt to delete the clinic associated with the user's ID
    const result = await Clinic.deleteOne({ owner: user._id }).exec()
    // If the deletion is successful (acknowledged), return a 204 No Content status
    if (result.acknowledged) {
        return context.text('', { status: 204 })
    }

    return context.json({
        error: "Something went wrong while trying to delete clinic."
    }, {
        status: InternalServerErrorCode
    })
})

clinicsRoute.put('/', mustBeAuthenticated, async (context: Context) => {
    const body = await context.req.json()
    if (body['clinic_name'] == null) {
        return context.json({
            error: "Missing field: `clinic_name`."
        }, {
            status: HttpBadRequestCode
        })
    }
    const clinicName = body['clinic_name']

    const user = context.get('user')
    let clinic = await Clinic.findOne({ owner: user._id }).exec()
    if (clinic != null) {
        return context.json({
            error: "You already have a clinic assigned to your account."
        }, {
            status: HttpBadRequestCode
        })
    }

    clinic = new Clinic({
        name: clinicName,
        serving: 0,
        owner: user._id,
        available: false
    })
    await clinic.save()
    return context.json(clinic)
})
