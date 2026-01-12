function dec2hex(dec: number) {
    return dec.toString(16).padStart(2, "0")
}

export function uniuri(len: number) {
    let arr = new Uint8Array((len || 40) / 2)
    crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}
