import {BACKEND_URL} from "@/index";
import type {User} from "@/types/user";
import type {Clinic} from "@/types/clinic";
import type {ServerError} from "@/types/error";

export const register = async (username: String, password: String, clinicName: String) =>
    fetch(BACKEND_URL + "/users", {
        method: "PUT",
        body: JSON.stringify({
            username: username,
            password: password,
            clinic_name: clinicName
        })
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as RegistrationResponse
        }

        if (resp.status === 400) {
            throw Error((await resp.json() as ServerError).error)
        }

        throw Error(`Received status ${resp.statusText} while trying to register user.`)
    })

export const logout = async (token: string) =>
    fetch(BACKEND_URL + "/users", {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    })

export const login = async (username: String, password: String) =>
    fetch(BACKEND_URL + "/users", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(async (resp) => {
        if (resp.ok) {
            return await resp.json() as LoginResponse
        }

        if (resp.status === 400) {
            throw Error((await resp.json() as ServerError).error)
        }

        throw Error(`Received status ${resp.statusText} while trying to register user.`)
    })

export type RegistrationResponse = {
    token: string,
    user: User,
    clinic: Clinic
}

export type LoginResponse = {
    token: string,
    user: User,
}