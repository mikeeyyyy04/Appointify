import {BACKEND_URL} from "@/index";
import type {Clinic} from "@/types/clinic";

export const fetchClinics = async (search: string | null) => {
    try {
        const resp = await fetch(BACKEND_URL + "/clinics" + (search == null ? "" : `?search=${search}`))
        if (resp.ok) {
            return await resp.json() as Clinic[]
        }
        throw Error(`Received status ${resp.statusText} while trying to request data about the clinics.`)
    } catch (e){
        throw Error(`Failed to fetch clinics with error: ${e}.`)
    }
}