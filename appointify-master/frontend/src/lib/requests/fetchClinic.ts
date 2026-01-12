import {BACKEND_URL} from "@/index";
import type {Clinic} from "@/types/clinic";
import type {ServerError} from "@/types/error";

export const fetchClinic = async (id: string) =>
    fetch(BACKEND_URL + "/clinics/" + id)
        .then(async (resp) => {
            if (resp.ok) {
                return await resp.json() as Clinic
            }
            throw Error(`Received status ${resp.statusText} while trying to request data about clinic ${id}.`)
        })

export const fetchOwnClinic = async (token: string) =>
    fetch(BACKEND_URL + "/clinics/own", {
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as Clinic
        } else if (resp.status === 404)  {
            return null
        }
        throw Error(`Received status ${resp.statusText} while trying to request own clinic data.`)
    })

export const incrementClinicServing = async (token: string) =>
    fetch(BACKEND_URL + "/clinics/serving", {
        method: "PUT",
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as Clinic
        }
        throw Error(`Received status ${resp.statusText} while trying to increment serving number.`)
    })

export const decrementClinicServing = async (token: string) =>
    fetch(BACKEND_URL + "/clinics/serving", {
        method: "DELETE",
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as Clinic
        }
        throw Error(`Received status ${resp.statusText} while trying to decrement serving number.`)
    })

export const setUnavailableClinic = async (token: string) =>
    fetch(BACKEND_URL + "/clinics/availability", {
        method: "DELETE",
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as Clinic
        }
        throw Error(`Received status ${resp.statusText} while trying to set clinic's status to unavailable.`)
    })

export const setAvailableClinic = async (token: string) =>
    fetch(BACKEND_URL + "/clinics/availability", {
        method: "PUT",
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as Clinic
        }
        throw Error(`Received status ${resp.statusText} while trying to set clinic's status to available.`)
    })

export const deleteClinic = async (token: string) =>
    fetch(BACKEND_URL + "/clinics", {
        method: "DELETE",
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return true
        }
        throw Error(`Received status ${resp.statusText} while trying to delete clinic.`)
    })

export const addNewClinic = async (token: string, clinicName: String) =>
    fetch(BACKEND_URL + "/clinics", {
        method: "PUT",
        body: JSON.stringify({
            clinic_name: clinicName
        }),
        headers: {
            'Authorization': token
        }
    }).then(async (resp) => {
        if (resp.ok) {
            return true
        }

        if (resp.status === 400) {
            throw Error((await resp.json() as ServerError).error)
        }

        throw Error(`Received status ${resp.statusText} while trying to add new clinic.`)
    })
