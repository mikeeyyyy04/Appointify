import {BACKEND_URL} from "@/index";
import type {User} from "@/types/user";

export const requestUser = async (token: string) => fetch(BACKEND_URL + "/users", {
    headers: {
        'Authorization': token
    }
}).then(async (response) => {
    if (response.ok) {
        return await response.json() as Promise<User>
    }

    return null
})