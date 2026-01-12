import {writable, type Writable} from "svelte/store";
import {Preferences} from "@capacitor/preferences";

export const token = writable<string | null>(null)
export const viewingClinicId = writable<string | null>(null)
export async function loadStores() {
    await load(token, 'user.token')
}

async function load(writable: Writable<any>, key: string, unmarshal: boolean = true) {
    const result = await Preferences.get({ key: key})
    if (result.value == null) {
        writable.subscribe(value => Preferences.set({key, value: unmarshal ? JSON.stringify(value) : value}))
        return
    }
    if (unmarshal) {
        writable.set(JSON.parse(result.value))
    } else {
        writable.set(result.value)
    }
    writable.subscribe(value => Preferences.set({key, value: unmarshal ? JSON.stringify(value) : value}))
}